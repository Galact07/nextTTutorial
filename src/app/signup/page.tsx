"use client"

import  axios  from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React,{useState} from 'react'

export default function SignUp(){

    const router = useRouter();

    const [user,setUser] =useState({
        username:"",
        email:"",
        password:""
    })

    const onSignUp= async()=>{
        try{
            const res = await axios.post('/api/users/signup',user)
            console.log(res.data);
            router.push('/login')
        }catch(err:any){
            console.log("Sign Up failed")
        }
    }

    return(
           <div className="h-screen flex flex-col justify-center items-center">
               <h1 className="text-3xl">SignUp</h1>
               <div className="flex flex-col">
                <label className="mt-3" htmlFor="username">Username</label>
                <input type="text" name="username"
                value={user.username} className="rounded-lg text-black"
                onChange={(e:any)=>setUser({...user,username:e.target.value})}
                />
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
               <button className="rounded-lg bg-slate-400 px-3 py-2 mt-4" onClick={onSignUp}>Sign Up</button>
               <Link href='/login' className="font-underline mt-3 underline">Visit Login Page</Link>
           </div>
       )
}