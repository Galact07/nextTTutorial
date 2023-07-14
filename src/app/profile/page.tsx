"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import { useEffect, useState } from "react"


export default function Profile(){
    const [user,setUser]=useState("nothing")

    const getData:any= async()=>{
        try{
            const res= await axios.get("/api/users/me")
            console.log(res.data)
            setUser(res.data.data._id);
        }catch(err:any){
            console.log(err);
        }
    }
    useEffect(()=>{
        getData()
    })

    const router= useRouter()
    const logout = async()=>{
        try{
            await axios.get("/api/users/logout")
            console.log("Successful")
            router.push('/login')
        }catch(err:any){
            return NextResponse.json({message:"Something went wrong"},{status:500})
        }
    }
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1>Profile</h1>
            <Link href={`/profile/${user}`}>
                <h1 className="px-3 py-4 bg-green-600 hover:underline">{user}</h1>
            </Link>
            <button className="px-5 py-3 mt-4 bg-blue-600 text-white" onClick={logout}>Logout</button>
        </div>
    )
}