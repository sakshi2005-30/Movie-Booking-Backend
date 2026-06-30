const userService=require("../services/user.service");
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")
const update=async(req,res)=>{
    try{
        console.log("req.body:",req.body)
        const respone = await userService.updateUserRoleORUserStatus(
          req.body,req.params.id
        );
        successResponseBody.data=respone;
        successResponseBody.message="Successly updated the user";
        return res.status(200).json(successResponseBody)
    }
    catch(error){
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err=error;
        return res.status(500).json(errorResponseBody)
    }
}
module.exports={update}