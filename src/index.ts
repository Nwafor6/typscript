import express, {Response, Request, Application, NextFunction, Express} from "express"
import cors from "cors"
import app from "./app"
import dotenv from  "dotenv"
import mongoose from "mongoose"


dotenv.config()
const { MONGO_URL, PORT } = process.env;


const port = process.env.PORT || 8000;
mongoose
    .connect(MONGO_URL)
    .then(()=>{
        console.log("MongoDB is  connected successfully")})
    .catch((err) => console.error(`Error: ${err}`));

app.get("/", (req:Request, res:Response)=>{
    res.send("welcome to express and typescript")
});

app.listen(port, ()=>{
    console.log(`server connected on ${port}`)
})