import logAuth from "../model/log.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.SECRETE_KEY || ')z(~tl:qf@)3w0DbZTr6NvB67dfghjgh2344567F';


export const geh = (req, res) =>{
    res.status(201).json({success: "welcome to protected area!"});
}

export const Register = async (req, res) =>{
    const {fullname, username, email, password} = req.body;
    try{
        if(!fullname || !username || !email || !password){
            return res.status(400).json({error: "all input field are required"});
        }
        await logAuth.findOne({email: email})
        .then((dbUser)=>{
            if(dbUser){
                return res.status(400).json({error: "user with email alrealdy exist"}); 
            }
            bcrypt.hash(password, 20)
            .then((hashedPswd)=>{
                const newUser = new logAuth({fullname, username, email, password: hashedPswd});
                newUser.save()
                .then((user)=>{
                    if(user){
                        return res.status(201).json({success: "registered successfully"});                     
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    catch{
        (error)=>{
            res.status(400).json({error: error});
        }
    }
}



export const Login = async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({error: "all input field are required"});
        }
        await logAuth.findOne({email: email})
        .then((dbUser)=>{
            if(!dbUser){
                return res.status(400).json({error: "Oops! user does not exist"}); 
            }
            bcrypt.compare(password, dbUser.password)
            .then((didMatch)=>{
                if(!didMatch){
                    return res.status(400).json({error: "wrong password"}); 
                }else{
                    const token = jwt.sign({_id:dbUser._id}, JWT_SECRET, {expiresIn: '1h'});
                    return res.status(201).json({userToken: token});
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    catch{
        (error)=>{
            console.log(error)
        }
    }
}