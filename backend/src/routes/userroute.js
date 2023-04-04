import express from 'express'
import {model} from '../models/user.js'
import bcrypt from 'bcrypt';
import {taskmodel} from '../models/task.js'
import jwt from "jsonwebtoken";


const route=express.Router();
route.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const saltRounds = 10;
   const hashPassword=await  bcrypt.hash(password, saltRounds);
   // const user= await model.findOne({username});
    const dbData=new model({
        username:username,
        password:hashPassword
    })
    const data= await dbData.save();


    res.json(data)

});
route.get("/register",async(req,res)=>{
    const data=await  model.find()
    console.log(data);
    res.send(data)
}
)
route.get("/addtask",async(req,res)=>{
  const data=await  taskmodel.find()
  console.log(data);
  res.send(data)
}
)
route.post('/addtask',async(req,res)=>{
  const {title,description}=req.body;

   console.log(title)
   console.log(description)
   
 // const user= await model.findOne({username});
  const dbData=new taskmodel({
      title:title,
      description:description,
  })
  const data= await dbData.save();
 console.log(data)

  res.json(data)
})
route.delete('/delete/:id',async(req,res)=>{
const data=req.params.id;
await taskmodel.findByIdAndDelete(data);
res.send("deleted")
})
route.put("/update",async(req,res)=>{
  const ntitle=req.body.title;
  const nDescription=req.body.description;
  const id=req.body.id;
  console.log(ntitle,id)

 const uData=await taskmodel.findByIdAndUpdate(id,{title:ntitle,description:nDescription})
    uData.save();
    
  
})

route.post('/login',async(req,res)=>{
    const {username,password}=req.body;
  const data=await  model.findOne({username})
  if (!data) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid =await bcrypt.compare(password,data.password);
  if (!isPasswordValid) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const token = jwt.sign({ id: data._id }, "secret");
  res.json({ token, userID: data._id });
});
  



export {route as userRouter}; 