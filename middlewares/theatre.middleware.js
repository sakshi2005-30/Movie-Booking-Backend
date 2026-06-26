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
const validateUpdateMovies=async(req,res,next)=>{
  //validate insert
  if(req.body.insert==undefined){
    errorResponseBody.message="The insert parameter is missing in the request";
    return res.status(400).json(errorResponseBody);
  }
  //validate movieIdds
  if(!req.body.movieIds){
    errorResponseBody.message="No movies present in the request to be updated in the theatre";
   return res.status(400).json(errorResponseBody);
  }
  //validte array
  if(!(req.body.movieIds instanceof Array)){
    errorResponseBody.message="Expected an array but found something else";
    return res.status(400).json(errorResponseBody);
  }
  if (req.body.movieIds.length<=0 ){
    errorResponseBody.message = "No movies present to be updated in the theatre";
    return res.status(400).json(errorResponseBody);
  }
  next();
}

module.exports={validateTheatreCreateRequest,validateUpdateMovies};
