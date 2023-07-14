import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = NextResponse.json({
            message:"Successfully logged out",
            success:true
        })
       
            response.cookies.delete("token");   
        
        return response
    }catch(err:any){
        return NextResponse.json({message:"Some error has occurred"},{status:500})
    }
}