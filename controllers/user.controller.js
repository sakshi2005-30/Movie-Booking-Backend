const userService=require("../services/user.service");
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")
const {STATUS}=require("../utils/constants")
const update=async(req,res)=>{
    try{
        console.log("req.body:",req.body)
        const respone = await userService.updateUserRoleORUserStatus(
          req.body,req.params.id
        );
        successResponseBody.data=respone;
        successResponseBody.message="Successly updated the user";
        return res.status(STATUS.OK).json(successResponseBody)
    }
    catch(error){
        if(error.err){
            errorResponseBody.err=error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err=error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}
module.exports={update}