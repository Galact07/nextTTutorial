"use client"

import  axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import React,{useState} from 'react'

export default function Login(){

    const router = useRouter();

    const [user,setUser] =useState({
        email:"",
        password:""
    })

    const onLogin= async()=>{
        try{
            const response = await axios.post('/api/users/login',user);
            console.log("response:",response.data)
            router.push('/profile')
        }catch(err:any){
            return NextResponse.json({
                err:"Something went wrong"
            },
            {
                status:400
            })
        }
    }

    return(
           <div className="h-screen flex flex-col justify-center items-center">
               <h1 className="text-3xl">Login</h1>
               <div className="flex flex-col">
                <label className="mt-3" htmlFor="email">Email</label>
                <input type="email" className="rounded-lg mt-2 text-black" name="email"
                value={user.email}
                onChange={(e:any)=>setUser({...user,email:e.target.value})}
                />
                <label className="mt-3" htmlFor="password">Password</label>
                <input type="password" className="rounded-lg mt-2 text-black" name="password"
                value={user.password}
                onChange={(e:any)=>setUser({...user,password:e.target.value})}
                />
               </div>
               <button className="rounded-lg bg-slate-400 px-3 py-2 mt-4" onClick={onLogin}>Login</button>
               <Link href='/signup' className="font-underline mt-3 underline">Visit Sign Up Page</Link>
               <Link href='/login/confirmEmail' className="font-underline mt-3 underline">Forgot Password</Link>
           </div>
       )
}