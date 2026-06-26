const { getMovie } = require("../controllers/movie.controller");
const Movie=require("../models/movie.model");
/**
 * 
 * @param data ->Object containing details of the new movie to be created
 * 
 * @returns ->return new movie object
 */
const createMovie=async(data)=>{
    try{
         const movie = await Movie.create(data);
         return movie;
    }
    catch(error){
        if(error.name==="ValidationError")
        {
             let err = {};
             Object.keys(error.errors).forEach((key) => {
               err[key] = error.errors[key].message;
             });
             console.log(err);
             return { err: err, code: 422 };
        }
        else{
            throw error;
        }
       
    }
    
   
}
/**
 * 
 * @param id ->Provides the id of the movie to be deleted
 * @returns ->deleted movie object
 */
const deleteMovie=async(id)=>{
    try{
         const response = await Movie.findByIdAndDelete(id);
         if(!response){
            return {
                err:"No movie found with this particular id",
                code:422
            }
         }
         return response;
    }
    catch(err){
        console.log(err);
        throw err;
    }
   
}

/**
 * 
 * @param id ->id used for finding the movie
 * @returns ->return the movie object
 */
const getMovieById=async(id)=>{
    const movie=await Movie.findById(id);
    if(!movie){
        return {
            err:"No movie found for the corresponding id provided",
            code:404
        }
    }
    return movie;
}
/**
 * 
 * @param {*} id ->id which wil be used to find the movie to be updated
 * @param {*} data ->contains the actual data to be updated
 * @returns ->returns the updated movie details
 */
const updateMovie=async(id,data)=>{
    try{
         const movie = await Movie.findByIdAndUpdate(id, data, {
           new: true,
           runValidators: true,
         });
         return movie;
    }
    catch(error){
         if (error.name === "ValidationError") {
           let err = {};
           Object.keys(error.errors).forEach((key) => {
             err[key] = error.errors[key].message;
           });
           console.log(err);
           return { err: err, code: 422 };
         } else {
           throw error;
         }
    }
   
}
/**
 * 
 * @param {*} filter ->filtering helps us to filter the data according to the conditions 
 * @returns ->return sthe object containg the filtered data
 */
const fetchMovies=async(filter)=>{
    let query={};
    if(filter.name){
        query.name=filter.name;
    }
    let movies=await Movie.find(query);
    if(!movies){
        return {
            err:"Not able to find the queries movie",
            code:404
        }
    }
    return movies;
}
module.exports={getMovieById,createMovie,deleteMovie,updateMovie,fetchMovies};