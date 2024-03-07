import Navbar from "@/Components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router.js";

export default function login(){
    const [email,setEmail] = useState("");
    const [pass, setPass] = useState("");
    const router = useRouter();
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(email,pass)
        if(email==""){
            alert("email should not be empty")
            return;
        }
        
        

        fetch('http://localhost:3000/api/authentication/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email,pass})
        }).then((res)=>res.json())
        .then((d)=>{
            console.log(d);
            if(d.success===true){
                localStorage.setItem('user',d.email.split('@')[0]);
                router.replace('/');
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    return (
        <>
        <Navbar />
            <div className="flex flex-col justify-center items-center">
            
                <div className="w-2/4 relative top-[42px] border bodrder-gray-400 p-5">
                <h1 className='text-3xl font-bold mt-2 mb-4 text-center	'>Signup</h1>
                    
                    <div>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" type="email" name="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email"></input>
                    </div>

                    <div>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" type="password" name="pass" value={pass} onChange={(e)=>{setPass(e.target.value)}} id="password" placeholder="Enter Password"></input>
                    </div>

                    

                    <div>
                        <button type='submit' className='bg-blue-500 mr-10 text-white font-bold rounded py-2 px-2 ' onClick={handleSubmit} id='submit' >submit</button>
                    </div>
                    </div>
            </div>
        </>
    )
}