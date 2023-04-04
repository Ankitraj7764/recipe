
import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
  username:String,
  password:String

})
export const model=mongoose.model('user',userSchema);