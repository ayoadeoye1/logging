import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.SECRETE_KEY || ')z(~tl:qf@)3w0DbZTr6NvB67dfghjgh2344567F';
//import mongoose from "mongoose";
import logAuth from "../model/log.js";


export default (req, res, next)=>{
    const {authorization} = req.header;
   try{
        if(!authorization){
            return res.status(401).json({error: "user not logged in"});
        }
        const token = authorization.replace('Bearer ', "");
        jwt.verify(token, JWT_SECRET, (error, data)=>{
            if(error){
                return res.status(401).json({error: "user not logged in"});
            }
            const {_id} = data;
            logAuth.findById(_id)
            .then((dbUser)=>{
                req.dbUser = dbUser
            })
            next();
        })
   }
   catch{
       (error)=>{
            console.log(error);
        }
    }
}