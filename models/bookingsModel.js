import mongoose from "mongoose";

const bookingSchema  = new mongoose.Schema({

    seat_id:{
        type:[String]
    },
    name:{
        type:String
    },
    phone:{
        type:Number
    }
});

const BookingSeatModel = mongoose.model('Booking', bookingSchema)
export default BookingSeatModel;