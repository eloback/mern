import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
//local development
import dotenv from 'dotenv'
dotenv.config()
const Connection_URI =  process.env.MONGODB_URI
//const Connection_URI = 'mongodb://mongo:27017/memories' // Docker Mongo
//const Connection_URI = 'mongodb://127.0.0.1:27017/memories' //Local Mongo
//const Connection_URI = 'mongodb+srv://'+process.env.DB_USER:process.env.DB_KEY+'@cluster0.jq9b3.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority' // Mongo Atlas
const PORT = process.env.PORT || 3001;
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js'

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.get('/', (req, res)=>res.send("Server is Running"));

mongoose.connect(Connection_URI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=> app.listen(PORT, ()=> console.log("Listening in port "+PORT) ))
    .catch((error)=> console.log(error) );

mongoose.set('useFindAndModify', false);
