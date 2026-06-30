const {errorResponseBody}=require("../utils/responseBody")
const jwt=require("jsonwebtoken");
const userService=require("../services/user.service");
const {USER_TYPE}=require("../utils/constants")
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
const validateResetPasswordMiddleware=async(req,res,next)=>{
    if(!req.body.oldPassword){
        errorResponseBody.err = "Missing the old Password";
        return res.status(400).json(errorResponseBody);
    }
    if(!req.body.newPassword){
        errorResponseBody.err="Missing the new Password "
        return res.status(400).json(errorResponseBody);

    }
    next();
}
const isAdmin=async(req,res,next)=>{
    const user=await userService.getUserById(req.user);
    if(user.userType!==USER_TYPE.admin){
        errorResponseBody.err="User is not an admin,cannot procces with the request";
        return res.status(401).json(errorResponseBody);
        
    }
    next();
}
const isClient = async (req, res, next) => {
  const user = await userService.getUserById(req.user);
  if (user.userType !== USER_TYPE.client) {
    errorResponseBody.err =
      "User is not an client,cannot procces with the request";
    return res.status(401).json(errorResponseBody);
  }
  next();
};
const isAdminOrClient=async(req,res,next)=>{
    const user=await userService.getUserById(req.user);
    if(user.userType!==USER_TYPE.admin ||  user.userType!==USER_TYPE.client){
        errorResponseBody.err="User is neither an admin nor a client,so can't process with the request";
        return res.status(401).json(errorResponseBody)
    }

}
module.exports={validateAuthRequest,validateSigninRequest,isAuthenticated,validateResetPasswordMiddleware,isAdmin,isClient,isAdminOrClient}