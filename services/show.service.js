const Show=require("../models/show.model");
const {STATUS} =require("../utils/constants");
const mongoose=require("mongoose");
const theatreService=require("../services/theatre.services");
const createShow=async(data)=>{
    try{
        const theatre=await theatreService.getTheatre(data.theatreId);
        console.log("theatre:",theatre)
        if(!theatre){
            throw {err:"No theatre found",code:STATUS.NOT_FOUND}
        } 
        const targetMovieId = new mongoose.Types.ObjectId(data.movieId);
        if(!theatre.movies.includes(targetMovieId)){
            throw {err:"Movie is not currently available in the requested theatre",code:STATUS.NOT_FOUND}
        }
        const response=await Show.create(data);
        return response;
    }
    catch(error){
        if(error.name==="ValidationError"){
            let err={};
            Object.keys(error.errors).forEach((key)=>{
                err[key]=error.errors[key].message
            })
            throw {err:err,code:STATUS.UNPROCESSABLE_ENTITY}
        }
        console.log(error);
        throw error;
    }
}
const getShows=async(data)=>{
    try{
        const filter={};
        if(data.theatreId){
            filter.theatreId=data.theatreId;
        }
        if(data.movieId){
            filter.movieId=data.movieId;
        }
        const response=await Show.find(filter);
        if(!response){
            throw {err:"No shows found",code:STATUS.NOT_FOUND};
        }
        return response;
    }
    catch(error){
         console.log(error);
         throw error;
    }
}
const deleteShow=async(id)=>{
    try{
        const response=await Show.findByIdAndDelete(id);
        if(!response){
            throw {err:"No show found with this id",code:STATUS.NOT_FOUND};
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error
    }
}
const updateShow=async(id,data)=>{
    try{
        const response=await Show.findByIdAndUpdate(id,data,{new:true,runValidators:true});
        if(!response){
            throw {err:"No show found with this id",code:STATUS.NOT_FOUND};
        }
        return response;
    }
    catch(error){
        console.log(error);
        throw error
    }
}
module.exports={createShow,getShows,deleteShow,updateShow};