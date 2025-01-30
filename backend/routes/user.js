const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();
const {JWT_SECRET} = require('../config');
const z = require('zod');
const { User, Accounts } = require('../db');
const {authMiddleware}= require("../middleware")

const signupSchema = z.object({
    username:z.string(),
    password:z.string(),
    firstName:z.string(),
    lastName:z.string()

})
const signinSchema = z.object({
    username:z.string(),
    password:z.string(),
})
const updateSchema = z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()
})
//sign up logic
router.post('/sign-up',async (req,res)=>{
    const body =req.body;
    const {success}=signupSchema.safeParse(body)
   

    if(!success){
        res.status(411).json({
            message:"invalid input"
        })
    }
    const existing_user = User.findOne({
        username:body.username
    })

    if(user._id){
        return res.json({
            message:"email already taken"
        })
    }

    const user =await User.create({
        userName:body.username,
        firstName:body.firstName,
        lastName:body.lastName,
        password:body.password
    })


    userId=user._id;
    const token = jwt.sign(userId,JWT_SECRET);

    await Accounts.create({
        userId,
        balance:1+Math.random()*10000
    })

    res.json({
        message:"user created successfully",
        token
    })


})
//signin logic
router.post('sign-in',(req,res)=>{
    const body = req.body
    const {success} = signinSchema.safeParse(body);

    if(!success){
       return  res.status(411).json({
            message:"invalid Input"
        });
    }

    const user = User.findOne({
        username:body.username,
        password:body.password
    })

    const token = jwt.sign(user._id,JWT_SECRET);

    return res.status(200).json({
        message:"sign in successfull",
        token
    })
})
//update logic
router.put('/',authMiddleware,async (req,res)=>{ 
    const {success} = updateSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message:"error while updating the info",
        })
    }

    await User.updateOne({
        _id:userId
    },req.body)

    return res.status(200).json({
        message:"info updated successfully"
    })
})

router.get('/bulk',authMiddleware,async (req,res)=>{
    const filter  = req.query.filter || "";
    const users= await User.find({
        $or : [{
            firstName : {
                "$regex":filter
            }
        },{
            lastName : {
                "$regex":filter
            }
        }
    ]
    })

    res.json({
        user : users.map(user=>({
            username : user.username,
            firstName: user.firstName,
            lastName : user.lastName,
            _id:user._id
        }))
    })

})

module.exports = router;