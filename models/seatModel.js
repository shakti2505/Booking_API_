import mongoose from "mongoose";

const seatSchema  = new mongoose.Schema({
    seat_identifier:{
        type:String
    },  
    seat_class:{
        type:String
    },
    is_booked:{
        type:Boolean,
        default:false
        
    }
});


const Seatmodel = mongoose.model("seat", seatSchema)

export default Seatmodel;