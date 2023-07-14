"use client"

import axios from "axios";
import { NextResponse } from "next/server";
import { useState,useEffect } from "react";


export default function VerifyMail(){
    const [ token,setToken] =useState("");
    const [verified,setVerified] = useState(false);

    const verifyMail = async()=>{
        try{
            await axios.post('/api/users/verifyMail',{token});
            console.log(`Email verified successfully`);
            setVerified(true);
            return NextResponse.json({
                message:"Successfully",
                success:true
            })
        }catch(err:any){
            new Error("Something went wrong : verify/page.tsx")
        }
    }
    

    useEffect(()=>{
        const newToken = window.location.search.split('=')[1];
        console.log(window.location.search.split('=')[1])
        setToken(newToken);
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyMail();
        }
    },[token])
    return(
        <>
        <div>
            {verified ?
              <h1>{token}</h1>
            :
            <h1>Nothing</h1>

            }
        
            
            
            </div></>
    )
}