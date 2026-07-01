const showController=require("../controllers/show.controller");
const showMiddleware=require("../middlewares/show.middleware");
const authMiddleware=require("../middlewares/auth.middlewares")
const routes=(app)=>{
    app.post("/mba/api/v1/shows",authMiddleware.isAuthenticated,showController.create);
}
module.exports=routes