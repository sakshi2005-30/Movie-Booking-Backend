const {errorResponseBody,successResponseBody}=require("../utils/responseBody")
const {STATUS, BOOKING_STATUS}=require("../utils/constants")
const bookingService=require("../services/booking.service");
const create=async(req,res)=>{
    try{
        let userId=req.user;
        const response=await bookingService.createBooking({...req.body,userId:userId});

        successResponseBody.message="Successfully created the booking";
        successResponseBody.data=response;
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        console.log(error)
        errorResponseBody.err=error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const update=async(req,res)=>{
    try{
        const response=await bookingService.updateBooking(req.body,req.params.id);
        successResponseBody.message="Successfully updated the response";
        successResponseBody.data=response;
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err=error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
const getBookings=async(req,res)=>{
    try{
        const response=await bookingService.getBookings({userId:req.user});
        successResponseBody.err="Successfully got the booking";
        successResponseBody.data=response;
        return res.status(STATUS.OK).json(successResponseBody);
    }
    catch(error){
        console.log(error)
        errorResponseBody.err=error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
const getAllBookings=async(req,res)=>{
    try{
        const response=await bookingService.getAllBookings();
         successResponseBody.err = "Successfully got the booking";
         successResponseBody.data = response;
         return res.status(STATUS.OK).json(successResponseBody);
        
    }
    catch(error){
        console.log(error);
         errorResponseBody.err = error;
         return res
           .status(STATUS.INTERNAL_SERVER_ERROR)
           .json(errorResponseBody);
    }
}
const getBookingById=async(req,res)=>{
    try{
        const response=await bookingService.getBookingById(req.params.id,req.user);
        successResponseBody.data=response;
        successResponseBody.message='Successfully fetched the booking';
        return res.status(STATUS.OK).json(successResponseBody);

    }
    catch(error){
         console.log(error);
         errorResponseBody.err = error;
         return res
           .status(STATUS.INTERNAL_SERVER_ERROR)
           .json(errorResponseBody);    
    }
}
module.exports={create,update,getBookings,getAllBookings,getBookingById}