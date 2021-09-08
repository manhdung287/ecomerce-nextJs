import React from 'react';
import connectDB from "../../../untils/connectDB";
import valid from "../../../untils/valid";
import bcrypt from 'bcrypt';
import Users from '../../../models/userModel';
import { createAccesstoken, createRefreshtoken } from '../../../untils/generateToken';
connectDB();

export default async(req,res)=>{
    switch(req.method){
        case "POST":
            await login(req,res);
            break;
    }
}

const login = async (req,res)=>{
    try {
        const{email,password} = req.body;
      
        const user = await Users.findOne({email});
        if(!user) return res.status(400).json({err: "this User does not Exits!"});

        const isMath  = await bcrypt.compare(password,user.password);
        if(!isMath) return res.status(400).json({err: "PassWord not coreect!"});

        const acceess_token = createAccesstoken({id: user._id});
        const refresh_token = createRefreshtoken({id: user._id});

        res.json({
            refresh_token,
            acceess_token,
            user:{
                name:user.name,
                avartar:user.avartar,
                email:user.email,
                root:user.root,
                isAdmin:user.isAdmin,
                isManager:user.isManager,
                isContent:user.isContent,
                createdAt:user.createdAt
            }
        });

    } catch (error) {
        return res.status(500).json({err:err.message})
    }
}