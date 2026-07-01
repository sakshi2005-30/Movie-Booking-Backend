const bookingController=require("../controllers/booking.controller")
const authMiddleware=require("../middlewares/auth.middlewares");
const bookingMiddleware=require("../middlewares/booking.middleware");
const routes=(app)=>{
    //create booking
    app.post("/mba/api/v1/bookings",authMiddleware.isAuthenticated,bookingMiddleware.validateBookingCreateRequest,bookingController.create);

    app.patch("/mba/api/v1/bookings/:id",authMiddleware.isAuthenticated,
        bookingMiddleware.canChangeStatus,bookingController.update);
}
module.exports=routes