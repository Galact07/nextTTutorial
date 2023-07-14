import {mongoConnect} from "@/dbconfig/dbconfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

mongoConnect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log("post"+reqBody);

        const user= await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User is not registered"},{status:500})
        }

        const passwordMatched= await bcryptjs.compare(password,user.password);
        console.log("Matched Password : ",passwordMatched);
        if(!passwordMatched){
            return NextResponse.json({error:"password is incorrect"},{status:500})
        }

        const cookieToken ={
            userId:user._id,
            username:user.password,
            email:user.email
        }

        const token = await jwt.sign(cookieToken,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response= NextResponse.json({
            message:"Login is Successful",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;

    }catch(err:any){
        return NextResponse.json({err:"Something is def wrong."+err.message},{status:404})
    }
}