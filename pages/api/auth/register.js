import React from 'react';
import connectDB from "../../../untils/connectDB";
import valid from "../../../untils/valid";
import bcrypt from 'bcrypt';
import Users from '../../../models/userModel';
connectDB();

export default async(req,res)=>{
    switch(req.method){
        case "POST":
            await register(req,res);
            break;
    }
}

const register = async (req,res)=>{
    try {
        const{name,email,password,confirmpass} = req.body;
        var errorMsg = valid(name,email,password,confirmpass);
        if(errorMsg){
            return res.status(400).json({err:errorMsg});
        }
        const user = await Users.findOne({email});
        if(user) return res.status(400).json({err: "this Email exits"});

        const passWordHash = await bcrypt.hash(password,12);

        const newUser = new Users({name,email,password:passWordHash,confirmpass})

        await newUser.save();
        
       res.json({msg:'Register Success'})
    } catch (error) {
        return res.status(500).json({err:err.message})
    }
}