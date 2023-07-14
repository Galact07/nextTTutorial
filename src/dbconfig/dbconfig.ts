//Very important function ,as whenever we want to talk to the database, we want the connect.

import mongoose from "mongoose"

export async function mongoConnect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const mongo = mongoose.connection;

        mongo.on("connected",()=>{
            console.log(`Mongoose connected successfully `);
        })
        mongo.on("error",(err:any)=>{
            console.log(`Something went wrong; ${err}`);
        })
    }catch(err:any){
        console.log("Something went wrong"+err);
    }
}