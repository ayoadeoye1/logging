import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import sss from "./route/log.js";
dotenv.config();

const app = express();

app.use('/', sss);

const url = process.env.MONGO_URI || 'mongodb+srv://ayoadeoye:AE205lrg@my-mongo-cluster.edykd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url, {useNewUrlParser: true, UseUnifiedTopology: true})
.then(()=>{console.log("DB connected successfully!")});

mongoose.connection.on('error', (err)=>{console.log(`error in connecting to DB ${err}`)});


const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{console.log(`listening on port ${PORT}`)});