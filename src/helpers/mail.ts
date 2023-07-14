import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs"
import User from '@/models/userModel';


export const SendEmail = async({userId,email,emailTYPE}:any)=>{

    try{
        const token = await bcryptjs.hash(userId.toString(),10);

        if(emailTYPE=="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verifyToken:token,
                verifyTokenExpiry: Date.now()+3600000
            })
        }else{
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:token,
                forgotPasswordTokenExpiry: Date.now()+3600000
            })
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASSWORD
            }
          });

          const sender = await transporter.sendMail({
            from: "sidnairr07@gmail.com", // sender address
            to: email, 
            subject: emailTYPE == "VERIFY" ? "Verify EMAIL" : "Reset Password email", // Subject line
            text: "Hello USER", // plain text body
            html: `<p>Click on the url to <a href="${process.env.DOMAIN}/verifyMail?token=${token}">Link</a> to 
            ${emailTYPE == "VERIFY" ? "verify your email " : "reset password "}</p> <br/>
            "${process.env.DOMAIN}/verifyMail?token=${token}"`, 
          });

          return sender;

    }catch(err:any){
        throw Error("In the Helper component")
    }


}
