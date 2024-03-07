


export default async function logout(req,res){
    // const router = useRouter();
    
    switch(req.method){
        case "GET":
           
            try {
                
                
                res.setHeader('Set-Cookie',`token=`)
                .status(200).json({message:"User logged out",success:true});
               
                
                
            } catch (error) {
                res.status(400).json({message:"User logout Failed",success:false});
            }
            

        
    }
}