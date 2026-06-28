const userService=require("../services/user.service");
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")
const signup=async(req,res)=>{
    try{
        const response=await userService.createUser(req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully registered a user";
        return res.status(201).json(successResponseBody);
    }
    catch(err){
        console.log(err);
        errorResponseBody.err=err;
        return res.status(500).json(errorResponseBody)
    }
}
module.exports={signup};