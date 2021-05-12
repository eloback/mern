import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
dotenv.config();
const Connection_URI = 'mongodb+srv://'+process.env.DB_KEY+'@cluster0.jq9b3.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js'

const app = express();



app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

mongoose.connect(Connection_URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, ()=> console.log("Listening in port "+PORT) ))
    .catch((error)=> console.log(error) );

mongoose.set('useFindAndModify', false);
