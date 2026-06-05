import mongoose, { mongo } from "mongoose";
import { user } from "../data/userdata.mjs";

const userdata=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
         type:String,
        required:true,
    }
})
const newDemo=new mongoose.model("userData",userdata)
export default newDemo;