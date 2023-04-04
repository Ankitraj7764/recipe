import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
  title:String,
  description:String

})
export const taskmodel=mongoose.model('taskdata',userSchema);