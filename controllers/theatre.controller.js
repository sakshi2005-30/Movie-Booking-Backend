const theatreService=require("../services/theatre.services");
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")
const {STATUS}=require("../utils/constants");
const create=async(req,res)=>{
    try{
        const response=await theatreService.createTheatre(req.body);
       
        successResponseBody.data=response;
        successResponseBody.message="Successfully created the theatre";
        return res.status(STATUS.CREATED).json(successResponseBody);

    }
    catch(err){
        if(err.err){
            errorResponseBody.err=err.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err=err;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
const destroy=async(req,res)=>{
    try {
        const response=await theatreService.deleteTheatre(req.params.id);
        if(response.err){
            errorResponseBody.err=response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        return res.status(200).json(successResponseBody)
    } catch (err) {
      errorResponseBody.err = err;
      return res.status(500).json(errorResponseBody);
    }
}
const getTheatre=async(req,res)=>{
    try {
      const response = await theatreService.getTheatre(req.params.id);
      if (response.err) {
        errorResponseBody.err = response.err;
        return res.status(response.code).json(errorResponseBody);
      }
      successResponseBody.data = response;
      return res.status(200).json(successResponseBody);
    } catch (err) {
      errorResponseBody.err = err;
      return res.status(500).json(errorResponseBody);
    }
}
const getTheatres=async(req,res)=>{
    try {
        const response=await theatreService.getAllTheatres(req.query);
        successResponseBody.data=response;
        return res.status(200).json(successResponseBody);
    } catch (err) {
      errorResponseBody.err = err;
      return res.status(500).json(errorResponseBody);
    }
}
const updateMovies=async(req,res)=>{
    try {
        const response=await theatreService.updateMoviesInTheatre(req.params.id,req.body.movieIds,req.body.insert);
      
        if(response.err){
            errorResponseBody.err=response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfuly updated the movies in the theatre";
        return res.status(200).json(successResponseBody);
    } catch (err) {
      errorResponseBody.err = err;
      return res.status(500).json(errorResponseBody);
    }
}
const updateTheatre=async(req,res)=>{
    try{
         const response = await theatreService.updateTheatre(
           req.params.id,
           req.body,
         );
       
         if (response.err) {
           errorResponseBody.err = response.err;
           return res.status(response.err).json(errorResponseBody);
         }
        successResponseBody.message="Successfully updated the theatre";
        successResponseBody.data=response;
        return res.status(200).json(successResponseBody);
    }
    catch(err){
         errorResponseBody.err = err;
         return res.status(500).json(errorResponseBody);
    }
   
}
const getMovies=async(req,res)=>{
    try {
        const response=await theatreService.getMoviesInTheatre(req.params.id);
        if(response.err){

            errorResponseBody.message=response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        return res.status(200).json(successResponseBody);
    } catch (err) {
      errorResponseBody.err = err;
      return res.status(500).json(errorResponseBody);
    }
}
const checkMovie=async(req,res)=>{
    try{
        const response=await theatreService.checkMovieInATheatre(req.params.theatreId,req.params.movieId);
        if(response.err){
            errorResponseBody.message=response.message;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        return res.status(200).json(successResponseBody);
    }
    catch(err){
         errorResponseBody.err = err;
         return res.status(500).json(errorResponseBody);
    }
}
module.exports={create,destroy,getTheatre,getTheatres,updateMovies,updateTheatre,getMovies,checkMovie};