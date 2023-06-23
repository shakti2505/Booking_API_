import Seatmodel from "../models/seatModel.js";
import SeatPricingModel from "../models/seatPricingModel.js";
import BookingSeatModel from "../models/bookingsModel.js";
class BookingControllers {
  static getallSeat = async (req, res) => {
    try {
      const allSeat = await Seatmodel.find().sort("seat_class");
      // allSeat.map((seat)=>{
      //   seat.is_booked=false
      //   seat.save()
      // })
      res.send(allSeat);
    } catch (error) {
      console.log(error);
    }
  };
  //gettting seat Details
  static getSeatPrice = async (req, res) => {
    try {
      const seat = await Seatmodel.findById(req.params.id)
      if (seat.is_booked !== true) {
        const seats_of_class = await Seatmodel.find({ seat_class: seat.seat_class })
        const total_seats_of_class = seats_of_class.length
        const available_seats_of_Class = await Seatmodel.find({ seat_class: seat.seat_class, is_booked: false })
        const seat_price_by_class = await SeatPricingModel.find({ seat_class: seat.seat_class })
        const total_available_seats_of_Class = available_seats_of_Class.length
        const total_booked_seat_of_class = total_seats_of_class - total_available_seats_of_Class
        seat_price_by_class.map((seat) => {
          if (total_booked_seat_of_class < total_seats_of_class * 0.4) {
            res.send(seat.min_price || seat.normal_price)
          }
          else if (total_booked_seat_of_class >= total_seats_of_class * 0.4 && total_booked_seat_of_class <= total_seats_of_class * 0.6) {
            if (seat.normal_price) {
              res.send(seat.normal_price)
            } else {
              res.send(seat.max_price)
            }
          }
          else {
            res.send(seat.max_price)
          }
        })
      }
      else {
        console.log("seat is sold out")
      }
    } catch (error) {
      console.log(error)
    }
  }
  //creating booking
  static createBooking = async (req, res) => {
    try {
      const { name, phone, seats } = req.body;
      const newBooking = new BookingSeatModel({
        name: name,
        phone: phone,
        seat_id: seats,
      });
      const seat_id_arr = newBooking.seat_id;
      const availableSeat = await Seatmodel.find({ _id: { $in: seat_id_arr }, is_booked: false });
      if (availableSeat) {
        availableSeat.map((seat) => {
          async function price_by_class() {
            const unbooked_seats_of_class = await Seatmodel.find({ seat_class: seat.seat_class, is_booked: false })
            const all_seats_of_class = await Seatmodel.find({ seat_class: seat.seat_class })
            const total_available_seat_of_class = unbooked_seats_of_class.length
            const total_seats_of_class = all_seats_of_class.length
            const seat_price_by_class = await SeatPricingModel.find({ seat_class: seat.seat_class })
            const total_booked_seats_of_class = total_seats_of_class - total_available_seat_of_class
            seat_price_by_class.map((seat_price) => {
              if (total_booked_seats_of_class < total_seats_of_class * 0.4) {
                res.send(seat_price.min_price||seat.normal_price)

              } else if (total_booked_seats_of_class >= total_seats_of_class * 0.4 && total_booked_seats_of_class <= total_seats_of_class * 0.6) {
                res.send(seat_price.normal_price)
              }
              else {
                res.send(seat_price.max_price)
              }
            })
          }
          price_by_class();
          seat_id_arr.map((seat_id) => {
            console.log(seat_id);
            async function update_status() {
              try {
                const seat_status = await Seatmodel.findByIdAndUpdate(
                  seat_id,
                  { $set: { is_booked: true } }
                );
                await seat_status.save();
              } catch (error) {
                console.log(error);
              }
            }
            update_status();
          });
          newBooking.save();
        }
        );
      }
      else{
        console.log("seat is sold out")
      }
    } catch (error) {
      console.log(error);
    }
  };
  //reterive booking
  static getBooking = async (req, res) => {
    try {
      const userPhone = req.params.phone
      const bookings = await BookingSeatModel.find({ phone: userPhone })
      bookings.map((user) => {
        res.send(user.seat_id)
      })
    } catch (error) {
      console.log(error)
    }
  }

}

export default BookingControllers;
