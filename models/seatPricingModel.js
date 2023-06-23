import mongoose from "mongoose"
const seatPricingSchema = new mongoose.Schema({
    seat_class:{
        type:String
    },
    min_price:{
        type:String
    }, 
    normal_price:{
        type:String,
    }, 
    max_price:{
        type:String,
    }
});
const SeatPricingModel = mongoose.model('seatPricing', seatPricingSchema)
export default SeatPricingModel;