const Theatre=require("../models/theatre.model");
const {}=require('../utils/responseBody')
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
            return {err:err,code:422};
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
const getAllTheatres=async()=>{
    try{
        const response=await Theatre.find({});
        return response;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
const updateMoviesInTheatre=async(theatreId,movieIds,insert)=>{
    try{
        const theatre=await Theatre.findById(theatreId);
        if(!theatre){
            return {
                err:"No such theatre found for the id provided",
                code:404
            }
        }
        if(insert){
            //add movie ids to the tehatre
            movieIds.forEach((movieId)=>{
                theatre.movies.push(movieId);
            })
        }
        else{
            //delete movie ids from theatre
           theatre.movies = theatre.movies.filter(
             (smi) => !movieIds.includes(smi.toString()),
           );
        }
        await theatre.save();
        return theatre;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}
module.exports={createTheatre,deleteTheatre,getTheatre,getTheatre,getAllTheatres,updateMoviesInTheatre};
