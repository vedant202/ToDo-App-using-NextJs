import Navbar from "@/Components/Navbar";
import { useState } from "react";

export default function Signup(){
    const [user, setuser] = useState({
        fname:"",
        lname:"",
        email:"",
        pass:"",
        cpass:"",
    })
    // const userObj = 

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(user)
        if(user.email==""){
            alert("email should not be empty")
            return;
        }
        if(user.pass.length <8 && user.cpass.length<8){
            alert("Password length is must be greater than 8")
            return;
        }
        if(user.pass != user.cpass){
            alert("Passwords doesn't matched")
            return;
        }

        fetch('http://localhost:3000/api/authentication/signup',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(user)
        }).then((res)=>res.json())
        .then((d)=>console.log(d))
        .catch((err)=>{
            console.log(err.message)
        })
    }
    
    const handleChange = (e)=>{
        setuser({...user,[e.target.name]:e.target.value})
    }

    return (
        <>
        <Navbar />
            <div className="flex flex-col justify-center items-center">
            
                <div className="w-2/4 relative top-[42px] border bodrder-gray-400 p-5">
                <h1 className='text-3xl font-bold mt-2 mb-4 text-center	'>Signup</h1>
                    <div >
                        {/* <input className='bg-gray-200 font-bold pr-4 pl-4 w-full h-10' type="text" name="fname" id="fname" placeholder="Enter First Name"></input> */}
                        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3' type="text" name="fname" id="fname" value={user.fname} onChange={handleChange} placeholder="Enter First Name" ></input>
                    </div>

                    <div>
                        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3' type="text" name="lname" id="lname" value={user.lname} onChange={handleChange} placeholder="Enter Last Name"></input>
                    </div>
                    <div>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" type="email" name="email" id="email" value={user.email} onChange={handleChange} placeholder="Enter Email"></input>
                    </div>

                    <div>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" type="password" name="pass" value={user.pass} onChange={handleChange} id="password" placeholder="Enter Password"></input>
                    </div>

                    <div>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3" type="password" name="cpass" value={user.cpass} onChange={handleChange} id="cpassword" placeholder="Enter Confirm Password"></input>
                    </div>

                    <div>
                        <button type='submit' className='bg-blue-500 mr-10 text-white font-bold rounded py-2 px-2 ' onClick={handleSubmit} id='submit' >submit</button>
                    </div>
                    </div>
            </div>
        </>
    )
}