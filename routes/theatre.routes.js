const theatreController=require("../controllers/theatre.controller");
const theatreMiddleware=require("../middlewares/theatre.middleware");
const authMiddleware=require("../middlewares/auth.middlewares");
const routes=(app)=>{
    app.post(
      "/mba/api/v1/theatres",
     theatreMiddleware.validateTheatreCreateRequest,
      theatreController.create,
    );

    app.delete("/mba/api/v1/theatres/:id",theatreController.destroy)
    app.get("/mba/api/v1/theatres/:id",theatreController.getTheatre)

    app.get(
      "/mba/api/v1/theatres",
      authMiddleware.isAuthenticated,
      theatreController.getTheatres,
    );

    app.patch("/mba/api/v1/theatres/:id/movies",theatreMiddleware.validateUpdateMovies,theatreController.updateMovies)
    app.put("/mba/api/v1/theatres/:id",theatreController.updateTheatre);
     app.patch("/mba/api/v1/theatres/:id", theatreController.updateTheatre);

     app.get("/mba/api/v1/theatres/:id/movies",theatreController.getMovies);
     app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",theatreController.checkMovie);
}
module.exports=routes