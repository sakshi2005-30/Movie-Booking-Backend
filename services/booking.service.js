const {STATUS}=require("../utils/constants");
const {errorResponseBody}=require("../utils/responseBody")
const Booking=require("../models/booking.model");

const createBooking=async(data)=>{
    try{
        const response=await Booking.create(data);
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
const updateBooking=async(data,id)=>{
    try{
       console.log(`id: [${id}]`);
        const response=await Booking.findByIdAndUpdate(id,data,{returnDocument:"after",runValidators:true});
        console.log("response",response);
        if(!response){
            throw{err:"No booking found for the given id",code:STATUS.NOT_FOUND};
        }
        return response;
    }
    catch(error){
        console.log(error);
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            })
            throw {err:err,code:STATUS.UNPROCESSABLE_ENTITY};
        }
        throw error;
    }
}
const getBookings=async(data)=>{
    try{
         const response = await Booking.find({ userId: data.userId });
         console.log("res:",response)
         return response;
    }
    catch(error){
        console.log(error);
        throw error
    }
   
}
const getAllBookings=async(req,res)=>{
    try{
        const response=await Booking.find({});
        return response;
    }
    catch(error){
         console.log(error);
         throw error;
    }
}
const getBookingById=async(id,userId)=>{
    try{
        const response=await Booking.findById(id);
        if(!response){
            throw {err:"No booking present for this id",code:STATUS.NOT_FOUND};
        }
        if(userId!=response.userId){
            throw {err:"No booking present",code:STATUS.UNAUTHORIZED};
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
module.exports={createBooking,updateBooking,getAllBookings,getBookings,getBookingById};