const {errorResponseBody}=require("../utils/responseBody")
const validateUpdateUserRequest=async(req,res)=>{
    if(!req.body.userType || req.body.userStatus){
        errorResponseBody.err="Malformed request,atleast send one request";
        return res.status(400).json(errorResponseBody);
    }
}
module.exports={validateUpdateUserRequest};