const Movie=require("../models/movie.model")
const createMovie=async(req,res)=>{
    try{
        const movie=await Movie.create(req.body);
        res.status(201).json({
            success:true,
            error:{},
            data:movie,
            message:"Successfully created a movie"
        })
    }
    catch(err){
        console.log(err);
         res.status(500).json({
           success: true,
           error: err,
           data: {},
           message: "Something went wrong",
         });
    }
}
module.exports={createMovie};