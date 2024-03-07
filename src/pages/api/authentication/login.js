import Connection from "../db.js";
import UserModal from "../../../Modals/user.js";
import jwt from 'jsonwebtoken';
// import { useRouter } from "next/router.js";

const SECRET_KEY = "MYSECRETKEY@123";

export default async function login(req,res){
    // const router = useRouter();
    await Connection();
    
    switch(req.method){
        case "POST":
            const body = req.body;
            console.log("Body ");
            console.log(body)
            try {
                const user = await UserModal.find({email:body.email,pass:body.pass});
                if(user.length!==0){
                    console.log("Email :-"+user[0].email)
                    const token = jwt.sign({email:user.email},SECRET_KEY);
                    console.log("Generated Token :- "+token); 
                    // router.replace('/');
                    res.setHeader('Set-Cookie',`token=${token};max-age=86400;path=/`)
                    .status(200).json({message:"User logged In",success:true,email:user[0].email});
                }
                else{
                 throw Error("User not found");   
                }
                
                
            } catch (error) {
                res.status(400).json({message:"User Cration Failed",success:false});
            }
            

        
    }
}