"use client"
export default function UserProfile({params}:any){
    return(
        <div className=" h-screen flex flex-col justify-center items-center ">
            <h1>{params?.id}</h1>
        </div>
    )
}