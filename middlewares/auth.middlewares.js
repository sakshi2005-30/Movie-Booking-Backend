const {errorResponseBody}=require("../utils/responseBody")
const jwt=require("jsonwebtoken");
const userService=require("../services/user.service")
const validateAuthRequest=async(req,res,next)=>{
    if(!req.body.name){
        errorResponseBody.err="Name of the user not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.email){
        errorResponseBody.err="Email of the user not present in the request";
         return res.status(400).json(errorResponseBody);
    }
    if(!req.body.password){
        errorResponseBody.err="Password of the user not present in the request";
          return res.status(400).json(errorResponseBody);
    }
    next();
}
const validateSigninRequest=async(req,res,next)=>{
   
        //validate email
        if(!req.body.email){
            errorResponseBody.err="No email provided"
            return res.status(400).json(errorResponseBody);
        }

        //validate password
        if(!req.body.password){
            errorResponseBody.err="No password provided for signin";
            return res.status(400).json(errorResponseBody)
        }
        next();
    
}

const isAuthenticated=async(req,res,next)=>{
    try{
        const token = req.headers["x-access-token"];
       
        if (!token) {
          errorResponseBody.err = "No token provided";
          return res.status(403).json(errorResponseBody);
        }
        const response = jwt.verify(token, process.env.AUTH_KEY);
        if (!response) {
          errorResponseBody.err = "Token not verified";
          return res.status(401).json(errorResponseBody);
        }
        const user=await userService.getUserById(response.id);
        req.user=user.id
     
        next();
    }
    catch(err){
        if(err.code===404){
            errorResponseBody.err="User doesn't exists"
            return res.status(err.code).json(errorResponseBody);
        }
        errorResponseBody.err=err;
        return res.status(500).json(errorResponseBody);
    }
    
}
module.exports={validateAuthRequest,validateSigninRequest,isAuthenticated}