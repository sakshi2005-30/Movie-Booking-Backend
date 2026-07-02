const Payment=require("../models/payment.model");
const Booking=require('../models/booking.model');
const Show=require("../models/show.model");
const User=require('../models/user.model');

const {STATUS,PAYMENT_STATUS,BOOKING_STATUS,USER_TYPE}=require("../utils/constants");

const createPayment=async(data)=>{
    try{
        const booking=await Booking.findById(data.bookingId);

        if(!booking){
            throw {err:"No booking found",code:STATUS.NOT_FOUND};
        }
        let bookingTime=booking.createdAt;
        let currentTime=Date.now();

        let minutes=Math.floor(((currentTime-bookingTime)/1000)/60);
        if(minutes>5){
            booking.status=BOOKING_STATUS.expired;
            await booking.save();
            return booking;
        }

        const payment=await Payment.create({
            bookingId:data.bookingId,
            amount:data.amount
        })
        if(payment.amount!==booking.totalCost){
            payment.status=PAYMENT_STATUS.failed
        }
        if(!payment || payment.status===PAYMENT_STATUS.failed){
            booking.status=BOOKING_STATUS.cancelled;
            await payment.save();
            await booking.save();
            return booking;
        }
        payment.status=PAYMENT_STATUS.success;
        await payment.save();
        booking.status=BOOKING_STATUS.successfull;
        await booking.save();
        return booking;
    }
    
    catch(error){
        console.log(error);
        throw error;
    }
}
module.exports={createPayment};