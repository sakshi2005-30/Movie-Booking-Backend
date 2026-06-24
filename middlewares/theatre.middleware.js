const {errorResponseBody}=require("../utils/responseBody")
const validateTheatreCreateRequest=async(req,res,next)=>{
    //name
    if(!req.body.name){
      errorResponseBody.message="The name of the theatre is not present in the request"
      return res.status(404).json(errorResponseBody);  
    }
    //pincode
    if (!req.body.pincode) {
      errorResponseBody.message = "The pincode of the theatre is not present in the theatre";
      return res.status(404).json(errorResponseBody);
    }
    //city
    if (!req.body.city) {
      errorResponseBody.message =
        "The city of the theatre is not present in the theatre";
      return res.status(404).json(errorResponseBody);
    }
    next();
}
module.exports={validateTheatreCreateRequest};
