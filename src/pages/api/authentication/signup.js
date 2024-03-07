import Connection from "../db.js";
import UserModal from "../../../Modals/user.js"

export default async function signup(req,res){
    await Connection();
    switch(req.method){
        case "POST":
            const user = req.body;
            try {
                const model = new UserModal({fname:user.fname,lname:user.lname,email:user.email,pass:user.pass,isDeleted:false});

                const myUser = await model.save();

                res.status(200).json({message:"User Created",success:true,myUser});
            } catch (error) {
                res.status(400).json({message:"User Cration Failed",success:false});
            }
            

        
    }
    

    

    
}