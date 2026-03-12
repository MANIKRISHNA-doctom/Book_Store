import jwt from "jsonwebtoken"
import React from 'react'
const authMiddleware = (req,res,next)=>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Not logged in"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log("verifed");
        req.user = decoded;  // attach payload to request

        next();
    }
    catch(err){
        res.status(401).json({message:"Invalid token"});
    }

}

export default authMiddleware;