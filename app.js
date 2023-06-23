import express from 'express';
import connectDB from './DB/connectionDB.js';
import router from './Routes/routes.js'
import './models/bookingsModel.js'

const app  = express();
const PORT  = process.env.PORT || 3000
const DATABASE_URL = process.env.PORT || "mongodb://127.0.0.1:27017/seat_Bookings";

//database connection
connectDB(DATABASE_URL)

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json());


//load Router
app.use('/api',router )

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
