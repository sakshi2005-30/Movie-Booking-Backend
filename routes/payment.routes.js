const paymentController=require("../controllers/payment.controller");

const authMiddleware=require("../middlewares/auth.middlewares");
const routes=(app)=>{
    app.post("/mba/api/v1/payments",authMiddleware.isAuthenticated,paymentController.create);
}
module.exports=routes;