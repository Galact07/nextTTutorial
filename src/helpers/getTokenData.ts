import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default function getTokenData(request:NextRequest){
    try{
        const token = request.cookies.get("token")?.value || ""
        const verifiedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return verifiedToken.userId;
    }catch(err:any){
        throw Error("Something went wrong")
    }
}