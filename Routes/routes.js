import  express from "express";
import BookingControllers from '../Controllers/seatControllers.js'
const router = express.Router()


router.get('/seats', BookingControllers.getallSeat)
router.get('/seats/:id', BookingControllers.getSeatPrice)
router.post('/bookings', BookingControllers.createBooking)
router.get('/my-booking/:phone', BookingControllers.getBooking)

export default router;

