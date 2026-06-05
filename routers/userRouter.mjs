import { Router } from "express";
import { user } from "../data/userdata.mjs";
import { createUser } from "../controllers/userControllers.mjs";
import{matchedData,validationResult,checkSchema} from "express-validator"
import newDemo from "../models/userdb.mjs";
import bcrypt from "bcrypt";
const router=Router();


router.get('/api/user',async(req,res)=>{
    try{
        const demo=await newDemo.find()
        return res.status(200).json(demo)
    }
    catch(err){
        return res.status(400).json({msg:err})
    }
})
router.get('/api/user/:id',async(req,res)=>{
    const id=req.params.id;
   
    try{
        const demo=await newDemo.findByID(id)
        return res.status(200).json(demo)
    }
    catch(err){
        return res.status(400).json({msg:err})
    }
})

router.post('/api/user',checkSchema(createUser),async(req,res)=>{
    const result=validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({msg:result.array()})
    }
    const body=matchedData(req)
    body.password=await bcrypt.hash(body.password,10)
    const demo= new newDemo(body)
    try{
        const newUser=await demo.save()
        return res.status(201).json(newUser)
    }
    catch(err){
        return res.status(400).json({msg:err})
    }
})

//login post method
router.post('/api/login/',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await newDemo.findOne({email})
        if(!user){
            return res.status(400).end("User not found")
        }
        const isMatch=await bcrypt.compare(
            password,
            user.password
        )
        if(!isMatch){
            return res.status(400).json({msg:"Invalid password"})
        }
        return res.status(200).json({msg:"Login successfully"})
    }
    catch(err){
        return res.status(404).json({msg:err})
    }
})
router.put('/api/user/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(400).end("This id not found")
    }
    try{
        const demo1=await newDemo.findByIDAndUpdate(
             id,
            req.body,
            {new:true}
        )
        return res.status(200).json(demo1)
    }
    catch(err){
        return res.status(400).json({msg:err})
    }
})

router.delete('/api/user/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    try{
        await newDemo.findByIdAndDelete(id)
        return res.status(200).end("The data deleted successfully")
    }
    catch(err){
        return res.status(404).json({msg:err})
    } 

})
export default router;