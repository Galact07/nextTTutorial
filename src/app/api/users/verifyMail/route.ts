import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import { mongoConnect } from "@/dbconfig/dbconfig";

mongoConnect();

export async function POST(request:NextRequest){

    const reqBody =await request.json();
    const {token}:any = reqBody;

    const user= await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});
    console.log(user);
    if(!user){
        return  NextResponse.json({message:"Invalid Token"},{status:401});
    }

    user.isVerfied=true;
    user.verifyToken= undefined;
    user.verifyTokenExpiry= undefined;

    await user.save();

    return NextResponse.json({
        message:"Invalid Token",
        status:401
    })
    
}