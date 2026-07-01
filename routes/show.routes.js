const showController=require("../controllers/show.controller");
const showMiddleware=require("../middlewares/show.middleware");
const authMiddleware=require("../middlewares/auth.middlewares")
const routes=(app)=>{
    app.post("/mba/api/v1/shows",authMiddleware.isAuthenticated,showController.create);

    app.get("/mba/api/v1/shows",showController.getShows);

    app.delete("/mba/api/v1/shows/:id",authMiddleware.isAuthenticated,authMiddleware.isAdminOrClient,showController.deleteShow);

    app.patch("/mba/api/v1/shows/:id",
        authMiddleware.isAuthenticated,authMiddleware.isAdminOrClient,showMiddleware.validateUpdateShowRequest,showController.updateShow);
}
module.exports=routes