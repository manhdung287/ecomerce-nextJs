import React from 'react';
import connectDB from "../../../untils/connectDB";
import Users from '../../../models/userModel';
import { createAccesstoken, createRefreshtoken } from '../../../untils/generateToken';
import jwt from 'jsonwebtoken';
 
connectDB();


export default async (req,res)=>{
    try {
        const rf_token= req.cookies.refreshtoken;
        if(!rf_token) return res.status(400).json({err: "Please Login now!"});

        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
        if(!result) return res.status(400).json({err: "Your token is incorrect or expried"});

        const user = await Users.findById(result.id);
        if(!user) return res.status(400).json({err:"User not exits"})

        const access_token = createAccesstoken({id:user._id});

        res.json({
            access_token,
            user:{
                name:user.name,
                avartar:user.avartar,
                email:user.email,
                root:user.root,
                role:user.role,
                isAdmin:user.isAdmin,
                isManager:user.isManager,
                isContent:user.isContent,
                createdAt:user.createdAt
            }
        })

    } catch (err) {
        return res.status(500).json({err:err.message})
    }
}