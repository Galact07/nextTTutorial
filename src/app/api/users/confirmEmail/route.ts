import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { SendEmail } from "@/helpers/mail";
import { mongoConnect } from "@/dbconfig/dbconfig";

mongoConnect();

export async function POST(request:NextRequest){
    try{
        const reqBody= await request.json();
        const {email}:any= await reqBody;
        console.log(email)
        const user:any= await User.findOne({email});
        if(!user){
            return NextResponse.json(
                {message:"User Not found"},
                {status:400}
            )
        }
        console.log(user);

        await SendEmail({userId:user._id,email,emailTYPE:"FORGOT_PASSWORD"});

        return NextResponse.json({
            message:"Successfully",
            success:true
        })  
    }catch(err:any){
        return NextResponse.json(
            {message:err},
            {status:500}
        )
    }
}