import { mongoConnect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'

mongoConnect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
    const {token, newPassword}:any = await reqBody;
    const salt= await bcryptjs.genSalt(10);
    const newHashPass= await bcryptjs.hash(newPassword,salt);
    console.log(token,newPassword);
    const user = await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}});
    console.log(user);

    if(!user){
        return NextResponse.json({
            message:"User does not found",
            success:false
        })
    }

    user.password = newHashPass;
    user.forgotPasswordToken=undefined;
    user.forgotPasswordTokenExpiry=undefined;
    await user.save();

    console.log(user);
    return NextResponse.json({
        message:"Done forgotPassword:route.ts",
        status:401
    })

    }catch(err:any){
        return NextResponse.json({
            message:"Something went wrong",
            status:500
        })
    }

    
}