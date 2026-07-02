const paymentService=require("../services/payment.service");
const {STATUS}=require("../utils/constants");
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")
const create=async(req,res)=>{
    try{
        const response=await paymentService.createPayment(req.body);
        successResponseBody.data=response;
        successResponseBody.message="Succesly processed the payment";
        return res.status(STATUS.CREATED).json(successResponseBody);
    }
    catch(error){
        console.log(error);
        errorResponseBody.err=error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
module.exports={create};