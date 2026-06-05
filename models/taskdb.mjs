import mongoose from "mongoose";
import { task } from "../data/taskdata.mjs";
import newDemo from "./userdb.mjs";

const taskdata=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:"",
        required:true
    },
    status:{
        type:String,
        enum:["pending","in-process","completed"],
        default:"pending",
        required:true
    },
    priority:{
        type:String,
        enum:["high","medium","low"],
        default:"medium",
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:newDemo,
        required:true
    }
})
const demo= new mongoose.model("tasks",taskdata)
export default demo;