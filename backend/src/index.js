import mongoose from 'mongoose';
import express from 'express';

import cors from 'cors';
import { userRouter } from './routes/userroute.js'
//mongodb+srv://recipe123:Recipe123@recipe.3urezfv.mongodb.net/recipe?retryWrites=true&w=majority

const app = express();
const PORT=process.env.PORT || 3001

app.get("/",async(req,res)=>{
    const data= await fetch("http://localhost:3001/auth/register");
    const data1=await data.json();
    console.log(data1);
  

})
app.use(cors())
 
app.use(express.json());
app.use("/auth",userRouter)
mongoose.connect('mongodb+srv://recipe123:Recipe123@recipe.3urezfv.mongodb.net/recipe?retryWrites=true&w=majority');






app.listen(PORT, () => {
    console.log("connected")
})
