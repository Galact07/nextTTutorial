"use client"

import React, {useState,useEffect} from "react"
import axios from "axios";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";


export default function ForgotPassword(){
    const [oldPassword,setOldPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [token,setToken] =useState("");
    const router =useRouter();

    const passwordChange=async()=>{
        try{
            if(oldPassword===newPassword){
                await axios.post('/api/users/forgotPassword',{token,newPassword});
                router.push('/login');
            }else{
                return NextResponse.json({
                    message:"Passwords does not match with each-other",
                    success:true
                })
            }
        }catch(err:any){
            console.log("Error", err);
        }
    }

    useEffect(()=>{
        const newToken = window.location.search.split('=')[1];
        console.log(window.location.search.split('=')[1])
        setToken(newToken);
    },[])

    return (
        <main className="h-screen w-full flex flex-col justify-center items-center">
             <label className="mt-3" htmlFor="password">Old Password</label>
                <input type="password" className="rounded-lg mt-2 text-black" name="password"
                value={oldPassword}
                onChange={(e:any)=>setOldPassword(e.target.value)}
                />
                 <label className="mt-3" htmlFor="password">New Password</label>
                <input type="password" className="rounded-lg mt-2 text-black" name="password"
                value={newPassword}
                onChange={(e:any)=>setNewPassword(e.target.value)}
                />
                <button className="rounded-lg bg-slate-400 px-3 py-2 mt-4"  onClick={passwordChange}>Change Password</button>
        </main>
    );
}