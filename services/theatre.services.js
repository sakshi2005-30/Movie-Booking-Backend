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
       if(insert){
        //add movies to theatre
        await Theatre.updateOne(
            {_id:theatreId},
            {$addToSet:{movies:{$each:movieIds}}}
        );
       }
       else{
        //remove movies from theatre
        await Theatre.updateOne(
            {_id:theatreId},
            {$pull:{movies:{$in:movieIds}}}
        )
       }
       const theatre=await Theatre.findById(theatreId);
       if(!theatre){
        return {
            err:"No theatre found with this id",
            code:404
        }
       }
       await theatre.save();
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
module.exports={createTheatre,deleteTheatre,getTheatre,getTheatre,getAllTheatres,updateMoviesInTheatre,updateTheatre};
