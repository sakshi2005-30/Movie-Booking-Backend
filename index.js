const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");
const movieRoutes=require("./routes/movie.routes")
const theatreRoutes=require("./routes/theatre.routes")
const authRoutes=require("./routes/auth.routes")
const userRoutes=require("./routes/user.routes");
app.use(express.json());
//mongoose.set("debug",true);
movieRoutes(app);
theatreRoutes(app);
authRoutes(app);
userRoutes(app);
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