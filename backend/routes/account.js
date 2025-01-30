const express = require('express');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware');
const { Accounts } = require('../db');
const router = express.Router();

router.get('balance',authMiddleware, async (req,res)=>{
    const account = await Accounts.findONe({
        userId:req.userId,
    })

    res.json({
        balance : account.balance
    })
})

router.post('transfer',authMiddleware,async (req,res)=>{
   const session = await mongoose.startSession();

   session.startTransaction();

   const {amount , to} = req.body;

   const account = await Accounts.findOne({
    userId: req.userId,
   }).session(session);

   if(!account || account.balance < amount){
    await session.abortTransaction();
    return res.status(400).json({
        message:'insufficient balance'
    })
   }

   const toAccount = await Accounts.findOne({
    userId: to
   }).session(session);

   if(!toAccount ){
    await session.abortTransaction();
    return res.status(400).json({
        message:"Invalid account"
    })
   }

   await Accounts.updateOne(
    {
        userId:req.userId,
    },{
        $inc:{
            balance:-amount
        }
    }
   ).session(session);

   await Accounts.updateOne({
    userId:to
   },{
    $inc:{
        balance:+amount
    }
   }).session(session);

   await session.commitTransaction();

   res.json({
    message:'transfer succesful'
   })

})


module.exports = {
    router
}