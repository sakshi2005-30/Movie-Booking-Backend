const Theatre=require("../models/theatre.model");
const Movie=require("../models/movie.model")
const {STATUS}=require("../utils/constants")
const createTheatre=async(data)=>{
    try{
        const response=await Theatre.create(data);
        return response;
    }
    catch(error){
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message;
            })
           throw {err:err,code:STATUS.UNPROCESSABLE_ENTITY};
        }
       console.log(error);
        throw error;
    }
}
const deleteTheatre=async(id)=>{
    try{
        const response=await Theatre.findByIdAndDelete(id);
        if(!response){
            return {
                err:"No record of a theatre fouund for the particluar id",
                err:404
            }
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
const getTheatre=async(id)=>{
    try{
        const response=await Theatre.findById(id);
        if(!response){
            return {
                err:"No theatre found with this id",
                code:404
              
            }
        }
          return response;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
const getAllTheatres=async(data)=>{
    try{
        let query={};
        let pagination={};
        if(data && data.city){
            query.city=data.city;
        }
        if(data && data.pincode){
            query.pincode=data.pincode;
        }
        if(data && data.name){
            query.name=data.name
        }
       // 6a368128e838cf5329a6a504
         
        if(data && data.movieId){
      
           
            query.movies={$all:data.movieId}
        }
        if(data && data.limit){
            //this represents how many theatres on a singkle page shown
            pagination.limit=data.limit
        }
        if(data && data.skip){
            //how many records we want to skip
            //skiping also depends on which page we are
            let perPage=(data.limit)?data.limit :3;
            pagination.skip=data.skip*perPage;
        }
       
       
        const response=await Theatre.find(query,{},pagination);
        return response;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
const updateMoviesInTheatre=async(theatreId,movieIds,insert)=>{
    try{
        let theatre;
       if(insert){
        //add movies to theatre
       theatre= await Theatre.findByIdAndUpdate(
          { _id: theatreId },
          { $addToSet: { movies: { $each: movieIds } } },
          { new: true },
        );
       }
       else{
        //remove movies from theatre
        theatre = await Theatre.findByIdAndUpdate(
          { _id: theatreId },
          { $pull: { movies: { $in: movieIds } } },
          { new: true },
        );
       }
      
       if(!theatre){
        return {
            err:"No theatre found with this id",
            code:404
        }
       }
   
       return theatre.populate("movies");
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
const updateTheatre=async(id,data)=>{
    try{
        const response = await Theatre.findByIdAndUpdate(
          id,
          data,
          { new: true, runValidators: true },
        );

        if(!response){
            return {
                err:"No theatre present with this particular id",
                code:404
            }
        }
        return response;
    }
    catch(error){
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message
            })
            return {err:err,code:442};
        }
    }
}
const getMoviesInTheatre=async(id)=>{
    try{
        console.log("id:",id);
        const theatre=await Theatre.findById(id,{name:1,movies:1,address:1}).populate("movies");
        if(!theatre){
            return {
                err:"No theatre found with this particular id",
                code:404
            }
        }
        return theatre;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
const checkMovieInATheatre=async(theatreId,movieId)=>{
    try{
        const theatre=await Theatre.findById(theatreId);
        console.log("id:",theatreId,movieId);
        if(!theatre){
            return {err:"No theatre presnt with this id",code:404};

        }
        console.log("index:", theatre.movies.indexOf(movieId));
        return theatre.movies.indexOf(movieId)!==-1;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
module.exports={createTheatre,deleteTheatre,getTheatre,getTheatre,getAllTheatres,updateMoviesInTheatre,updateTheatre,getMoviesInTheatre,checkMovieInATheatre};
