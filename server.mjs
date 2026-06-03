import express from "express";
import userRouters from "./routers/userRouter.mjs";
import taskRouters from './routers/taskRouter.mjs';
import { user } from "./data/userdata.mjs";
import { task } from "./data/taskdata.mjs";
import mongoose from "mongoose";
const app=express()
const port=2500;
app.use(express.json())
app.use('/api',userRouters)
app.use('/api',taskRouters)


mongoose.connect('mongodb://localhost/login')
.then(()=>console.log("Db connected"))
.catch((err)=>console.log(err))

mongoose.connect('mongodb://localhost/task')
.then(()=>console.log("Db connected"))
.catch((err)=>console.log(err))





app.listen(port,()=>{
    console.log(`The server running on ${port}`)
})