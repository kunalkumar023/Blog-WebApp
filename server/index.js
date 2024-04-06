import express  from "express";
import authrouter from "./routes/blog.js"
import connectToMongo from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser"

const app= express();
connectToMongo();


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static("public/upload"))
//api router
app.use(authrouter);

app.listen(4000,()=>{
    console.log("server is working");
})