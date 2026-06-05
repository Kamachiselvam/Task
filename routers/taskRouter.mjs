import { Router } from "express";
import { task } from "../data/taskdata.mjs";
import { taskValidator } from "../controllers/taskControllers.mjs";
import { validationResult,checkSchema,matchedData } from "express-validator";
import demo from "../models/taskdb.mjs";
const router=Router();


router.get('/task',async(req,res)=>{
    try{
        const task=await demo.find();
        return res.status(200).json(task)
    }
    catch(err){
        return res.status(400).end({msg:err})
    }
})

router.get('/api/task/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(400).end("This is not found")
    }
   try{
     const task1=await demo.findById(id);
     return res.status(200).json(task1)
   }
   catch(err){
    return res.status(400).json({msg:err})
   }
})

router.post('/api/task',checkSchema(taskValidator),async(req,res)=>{
    const result=validationResult(req);
    if(!result){
        return res.status(400).json({err:result.array()})
    }
    const {body}=req;
    const result1=new demo(body)
    try{
        const data=await result1.save()
        return res.status(201).json(data)
    }
    catch(err){
        return res.status(400).json({msg:err})
    }
    
})

router.put('/api/task/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(400).end("This is not found")
    }
    const newdemo=task.findIndex((u)=>u.id===id)
    const {body}=req;
    task[newdemo]={id:id,...body}
    return res.status(200).json({msg:"The data updated"})
})

router.delete('/api/task/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(400).end("This is not found")
    }
    const newres=task.findIndex((u)=>u.id===id)
    task.splice(newres,1)
    return res.status(200).end("The data deleted successfully")
})


export default router;
