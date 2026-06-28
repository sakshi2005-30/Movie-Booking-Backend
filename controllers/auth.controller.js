const userService=require("../services/user.service");
const {errorResponseBody,successResponseBody}=require("../utils/responseBody");
const jwt=require("jsonwebtoken")
const signup=async(req,res)=>{
    try{
        const response=await userService.createUser(req.body);
        successResponseBody.data=response;
        successResponseBody.message="Successfully registered a user";
        return res.status(201).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.error=error;
        return res.status(500).json(errorResponseBody)
    }
}
const signin=async(req,res)=>{
    try{
        const user=await userService.getUserEmail(req.body.email);
        if(!user){
            throw {err:"User with this email not found",code:404}
        }
         console.log("response:",user)
        const isValidPassword=await user.isValidPassword(req.body.password);
        if(!isValidPassword){
            throw {err:"Invalid password for  the given email",code:401};
        }
        const token=jwt.sign({id:user._id,email:user.email},process.env.AUTH_KEY,{expiresIn:"1d"});
        successResponseBody.message="Successfully logged in",
        successResponseBody.data={
            email:user.email,
            name:user.name,
            userType:user.userType,
            userStatus:user.userStatus,
            token:token
        }
        return res.status(200).json(successResponseBody);
    }
    catch(error){
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        console.log(error);
        errorResponseBody.err=error;
        res.status(500).json(errorResponseBody)
    }
}
module.exports={signup,signin};