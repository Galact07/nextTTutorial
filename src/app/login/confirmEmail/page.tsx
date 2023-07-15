"use client"

import axios from 'axios';
import React,{useState} from 'react'
import { useRouter } from 'next/navigation';
import { NextResponse } from "next/server";


const ConfirmEmail = () => {
    const [email,setEmail] = useState("");
    const router= useRouter();

    const confirm =async()=>{
        try{
            await axios.post("/api/users/confirmEmail",{email});
            return NextResponse.json({
                message:"Successfully",
                success:true
            }) 
        }catch(err:any){
            return NextResponse.json({
                message:"Something went wrong",
                success:true
            }) 
        }
    }
  return (
    <main className='h-screen w-full flex flex-col justify-center items-center'>
            <label className="mt-3" htmlFor="email">Email</label>
            <input type="email" className="rounded-lg my-3 text-black" name="email"
            value={email}
            onChange={(e:any)=>setEmail(e.target.value)}
            />
            <button className="rounded-lg bg-slate-400 px-3 py-2 mt-4"  onClick={confirm}>Confirm</button>
    </main>
  )
}

export default ConfirmEmail
