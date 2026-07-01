const {errorResponseBody,successResponseBody}=require("../utils/responseBody")
const {STATUS,BOOKING_STATUS,USER_STATUS, USER_TYPE}=require("../utils/constants");
const userService=require("../services/user.service");
const ObjectId=require("mongoose").Types.ObjectId
const theatreService=require("../services/theatre.services")

const validateBookingCreateRequest=async(req,res,next)=>{
    //validate theatreId
    if(!req.body.theatreId){
        errorResponseBody.err="Missing theatreId in the request";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }
    //validate theatreid

    if(!ObjectId.isValid(req.body.theatreId)){
        errorResponseBody.err="Theatre id is not valid";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }
    //check if theatre is present or not
    const theatre=await theatreService.getTheatre(req.body.theatreId);

    if(!theatre){
        errorResponseBody.err="No theatre found for the given theatreId";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    //validate movie presence
    //check if movieid is present
    if(!req.body.movieId){
        errorResponseBody.err="Missing movieId in the request";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    //check if given movie id is valid type
    if(!ObjectId.isValid(req.body.movieId)){
        errorResponseBody.err="Invalid movieId";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    //check if the tehatre contains the movie
    if(!theatre.movies.includes(req.body.movieId)){
        errorResponseBody.err="Given movie is not available in the request";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    //validate timing
    if(!req.body.timing){
        errorResponseBody.err="No movie timing present";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    //validate no of seats
    if(!req.body.noOfSeats){
        errorResponseBody.err="No seat provided";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    next()
}
const canChangeStatus=async(req,res,next)=>{
    const user=await userService.getUserById(req.user);
    if(user.userType==USER_TYPE.customer && req.body.status && req.body.status!==BOOKING_STATUS.cancelled){
        errorResponseBody.err="You are not allowed to change the bookings status";
        return res.status(STATUS.UNAUTHORIZED).json(errorResponseBody);
    }
    next();
}
module.exports={validateBookingCreateRequest,canChangeStatus};