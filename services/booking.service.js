const {STATUS}=require("../utils/constants");
const {errorResponseBody}=require("../utils/responseBody")
const Booking=require("../models/booking.model");

const createBooking=async(data)=>{
    try{
        const response=await Booking(data);
        return response;
    }
    catch(error){
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message
            })
            throw {err:err,code:STATUS.UNPROCESSABLE_ENTITY}
        }
    }
}
module.exports={createBooking}