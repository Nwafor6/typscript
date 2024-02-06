import joi from "joi";
import User from "../models/user";
import nodemailer from "nodemailer" 
import dotenv from "dotenv"

dotenv.config()


const userSchemaValidation = joi.object({
    email: joi.string().email().required(),
    firstname:joi.string().alphanum().min(3).max(10).required(),
    lastname:joi.string().alphanum().min(3).max(10).required(),
    password: joi.string().min(6).max(30).required()
})

const userTokenSchemaValidation = joi.object({
    email: joi.string().email().required(),
    token: joi.string().min(6).max(6).required()
})

const config={
    service:"gmail",
    auth:{
        user: process.env.username,
        pass:process.env.pass
    },
}

function randomToken(length:number = 6): string {
    const charaters= "0123456789";
    let token ="";
    for (let i = 0; i<length; i++){
        token +=charaters.charAt(Math.floor(Math.random()* charaters.length));
    };
    console.log(token, "token")
    return token


}

function sendTokenToMail(email:string, firstname:string, token:string){
    const data={
        "from":process.env.username,
        "to":email,
        "subject": "Activation token",
        'text':`Dear ${firstname}\n Here is your activation token ${token}`
    }
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (error, info)=>{
        if (error) {
            console.log(error + "Error here");
        } else {
        console.log('Email sent: ' + info.response);
        console.log(info)
        }
    });
}

export {userSchemaValidation, 
    sendTokenToMail, 
    randomToken,
    userTokenSchemaValidation};

