const theatreService=require("../services/theatre.services");
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")
const create=async(req,res)=>{
    try{
        const response=await theatreService.createTheatre(req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully created the theatre";
        return res.status(201).json(successResponseBody);

    }
    catch(err){
        errorResponseBody.err=err;
        return res.stautus(500).json(errorResponseBody);
    }
}
module.exports={create};