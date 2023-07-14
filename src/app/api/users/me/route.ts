import getTokenData from '@/helpers/getTokenData';
import User from '@/models/userModel';
import { mongoConnect } from '@/dbconfig/dbconfig';
import { NextRequest, NextResponse } from 'next/server';

mongoConnect();

export async  function GET(request:NextRequest){
    try{
        const userId =await getTokenData(request);
                const user= await User.findById(userId);
        return NextResponse.json({
            data:user
        })
    }catch(err:any){
        return NextResponse.json({
            message:"Everything went wrong",
            success:false
        })
    }
}