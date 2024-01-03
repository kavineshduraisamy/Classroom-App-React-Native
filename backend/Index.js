import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import User from './Assets/Routes/Router.js'
import Student from './Assets/Routes/StudentRouter.js'
import Teacher from './Assets/Routes/TeacherRouter.js'
import createCard from './Assets/Routes/ClasscardRouter.js'
import DBconfig from './Config/DBConfig.js'
import 'dotenv/config'



DBconfig()
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// app.use('/api',User)
app.use('/api', Teacher);
app.use('/api', Student);
app.use('/api', createCard);


app.get('/',(req,res)=>{
    res.send("Working")
})


const port =process.env.PORT || 5000
app.listen( process.env.PORT || 5000,() =>{
    console.log(`server is running in port ${port}`);
})