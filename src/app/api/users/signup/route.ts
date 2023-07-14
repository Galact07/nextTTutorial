import {mongoConnect} from "@/dbconfig/dbconfig";
import User from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import {SendEmail} from "@/helpers/mail";

mongoConnect();


export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {username,email,password} = reqBody;

        const user= await User.findOne({email})
        if(user){
            return NextResponse.json({error:"User is successfully found"},{status:400})
        }

        const salt= await bcryptjs.genSalt(10);
        const hashedPassword= await bcryptjs.hash(password,salt);
    

        const newUser= await new User({
            username,
            email,
            password:hashedPassword
        })

        const createUser= await newUser.save();
        console.log(createUser)

        await SendEmail({
            userId:createUser._id,
            email,
            emailTYPE:"VERIFY"
        })


            return NextResponse.json({
                message:"User is created",
                success:true
            })
    
        
    }catch(err:any){
        return NextResponse.json({err:"Something is def wrong."+err.message},{status:404})
    }
}