import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import {userSchemaValidation, sendTokenToMail, userTokenSchemaValidation, randomToken} from "../utils/utils";
import { verify } from "crypto";



const signUp = async (req:Request, res:Response)=>{
    const {email, firstname, lastname, password} = req.body;
    const {error}= userSchemaValidation.validate(req.body)
    if (error) {
        return res.status(400).json({message: error.details[0].message, success:false})
            
    };
    const userExists = await User.findByemail(email);

    if (userExists){
        return res.status(400).json({message: "email already exist", success:false})
    }
    const token = randomToken()
    try {
        const user = await User.create({
            email:email,
            firstname:firstname,
            lastname:lastname,
            password:password,
            token:token
        })

        await user.setPassword(password);
        await user.save();
        
        //  send user a token mail
        await sendTokenToMail(email, firstname, token)

        return res.status(201).json({message:"User created successfully", success:true});
        
    } catch (error) {
        
       return  res.status(400).json({message: error.message, success:"false"})
    }
}

const verifyAccount = async (req: Request, res:Response)=>{
    const {token, email} = req.body;
    const {error} = userTokenSchemaValidation.validate(req.body)
    if (error){
        return res.status(400).json({message: error.details[0].message, success:false})
    }
    const userExists = await User.findByemail(email);
    if (!userExists){
        return res.status(404).json({message: "email does not exist ", success:false})
    }
    try {
        if (userExists.token != token){
            return  res.status(400).json({message: "Invalid token", success:"false"})
        }
        await User.findOneAndUpdate({email:email},{$set: {verified : true}})
        return res.status(200).json({message:"Action activated", success:true}); 
    } catch (error) {
        return  res.status(400).json({message: error.message, success:"false"})
    }
    
}

export {signUp, verifyAccount}; 