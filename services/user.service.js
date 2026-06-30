const User=require("../models/user.model");
const {USER_STATUS,USER_TYPE}=require("../utils/constants");
const { errorResponseBody } = require("../utils/responseBody");
const createUser=async(data)=>{
    try{

        if(data.type)
        if (!data.userType || data.userType ===USER_TYPE.customer) {
          if (data.userStatus && data.userStatus !== USER_STATUS.approved) {
            throw { err: "We cannot set any other status", code: 404 };
          }
        }
        if(data.userType && data.userType!=USER_TYPE.customer){
            data.userStatus=USER_STATUS.pending;
        }
        const response=await User.create(data);
        return response;
    }
    catch(error){
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            })
            throw {err:err,code:422};
        }
        console.log(error);
        throw error;
    }
}
const getUserEmail=async(email)=>{
    try{
        const response=await User.findOne({email:email});
        if(!response){
            throw {err:"No user present with this email",code:404};
        }
        return response;
    }
    catch(error){
        console.log(err);
        throw err;
    }
}
const getUserById=async(id)=>{
    try{
       
        const user=await User.findById(id);
        if(!user){
            throw {err:"No user found with the given id",code:404};

        }
        return user;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
module.exports={createUser,getUserEmail,getUserById};