const {errorResponseBody}=require("../utils/responseBody");
const {STATUS}=require('../utils/constants');
const ObjectId=require("mongoose").Types.ObjectId;
const validateCreateShowRequest=async(req,res,next)=>{
    //validate theatreid
    if(!req.body.theatreId){
        errorResponseBody.err="No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }
     if (!ObjectId.isValid(req.body.theatreId)) {
       errorResponseBody.err = "Invalid theatre id";
       return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
     }
       if (!ObjectId.isValid(req.body.movieId)) {
         errorResponseBody.err = "Invalid movie id";
         return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
       }

     if (!req.body.movieId) {
       errorResponseBody.err = "No movie id provided";
       return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
     }
      if (!req.body.timing) {
        errorResponseBody.err = "No timing provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
      }
       if (!req.body.noOfSeats) {
         errorResponseBody.err = "No no of seats provided";
         return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
       }
        if (!req.body.price) {
          errorResponseBody.err = "No price provided";
          return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
        }
        next();
}
module.exports={validateCreateShowRequest}

