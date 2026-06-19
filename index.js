const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");



const PORT=process.env.PORT;
app.listen(PORT,async()=>{
    console.log(`Server is running at http://localhost:${PORT}`);

    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Not able to connect to database",err);
    }
})