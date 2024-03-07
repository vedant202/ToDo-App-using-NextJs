import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import Navbar from '@/Components/Navbar';
import { useRouter } from 'next/router';
import checkCookie from '@/checkCookie/checkCookie';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [todos,setTodos] = useState([]);
  const [todoId,setTodoId] = useState("");
  const [toggle,setToggle] = useState(false)
  const [checkLogin,setCheckLogin] = useState(false)
  const [collapseAddBtn,setCollapseAddBtn] = useState("Add To Do's");

  const router = useRouter();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log("Submit is clicked");
    console.log(title,desc)

    await fetch("http://localhost:3000/api/postTodo",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({title,desc,user:localStorage.getItem('user')}),
  })
  getAllToDos();
    setTitle("");
    setDesc("");
  }

  const handleLogout = async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/authentication/logout').then((res)=>res.json());
    console.log(response);
    localStorage.clear();
    document.cookie="token="
    router.push('/login')

  }

  const getAllToDos = async()=>{
    const response = await fetch('http://localhost:3000/api/getTodos').then((res)=>res.json());
    
    if(typeof response === 'object')
      {console.log("Res",response)
      setTodos(response)}
    else{
      setTodos([])}
  }

  const handleDelete = async(todo)=>{
    console.log("Delete ",todo);
    await fetch("http://localhost:3000/api/deleteTodo",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(todo),
  })
  getAllToDos();

  }

  const handleUpdateBtn = async(todo)=>{

    console.log("Update ",todo);
    setTitle(todo.title);
    setDesc(todo.Desc);
    setTodoId(todo._id)
    setToggle(true);
    
  //   await fetch("http://localhost:3000/api/deleteTodo",{
  //     method:"POST",
  //     headers:{
  //       'Content-Type':"application/json"
  //     },
  //     body:JSON.stringify(todo),
  // })
  // getAllToDos();

  }

  const handleUpdate = async(e)=>{
    e.preventDefault();
    await fetch("http://localhost:3000/api/updateTodo",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({title,desc,todoId}),
  })
  getAllToDos();
  setTitle("");
  setTodoId("");
    setDesc("");
  }

const handleAddTodo = (e)=>{
  e.preventDefault();

  setToggle(!toggle);
  if(!toggle){
    setCollapseAddBtn("Collapse Add ToDo's");
  }else{
    setCollapseAddBtn("Add ToDo's");
  }
}


  useEffect(()=>{
    console.log("Use Effect is running");
    getAllToDos();
    console.log(todos)

    if(!checkCookie()){
      
      router.push('/login');
    }
    else{
      setCheckLogin(true);
    }
    
    
  },[])

  return (
    <>
    <Navbar handleAddTodo={handleAddTodo} handleLogout={handleLogout} checkLogin={checkLogin} toggle={toggle} collapseAddBtn={collapseAddBtn} />
    <div className='container w-full'>
      {toggle? (<div>
        <h1 className='text-5xl font-bold pl-10 mb-2 mt-2'>Add To Do's</h1>
        <span className='pl-10'>ToDo ID :- {todoId}</span>
        <div className='container mx-auto mt-10 mb-10 pl-10'>
            <form>
              <div className='flex mb-2' >
                {/* <label>Title:- </label> */}
                <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className='bg-gray-200 font-bold pr-4 pl-4 w-full h-10' id='title' name='title'  placeholder='Enter Title'></input>
              </div>
              <div className='flex mb-2'>
                {/* <label>Description:- </label> */}
                <textarea id="comment" rows="4" value={desc} onChange={(e)=>setDesc(e.target.value)} class="bg-gray-200 w-full font-bold pr-4 pl-4 pt-2" placeholder="Write a comment..." required></textarea>

              </div>
              <button 
              onClick={handleSubmit}
              type='submit' className='bg-blue-500 mr-10 text-white font-bold rounded py-2 px-2 ' id='submit' >submit</button>
              <button onClick={(e)=>{setToggle(false); setTitle(""); setDesc("");setTodoId("")}} type='button' className='bg-red-500 mr-10 rounded-xl hover:bg-transparent hover:text-black hover:border hover:border-black text-white font-bold rounded py-2 px-2 ' id='cancel' >cancel</button>
              <button onClick={handleUpdate} type='button' className='bg-green-500 text-white font-bold rounded py-2 px-2 ' id='updateTodo' >update</button>
          </form>
        </div>
      </div>)
      
      :
      
      (<div  className='pl-10'>
        <h1 className='text-4xl font-bold pl-10 mb-8'>All To Do's</h1>
          
        {/* <div className='flex flex-wrap justify-evenly'> */}
        <div className='grid grid-cols-3 gap-0'>

        {/* All To Do's Here */}

          {
            
            todos.map((i)=>{
              console.log(i);
              return (
                <>
                <div class="py-4 flex flex-col justify-center">
                    <div className='border border-gray-200 rounded-lg max-w-sm shadow-md p-5 mb-10'>
                      <h1 className='text-3xl text-center font-bold underline-offset-4 mb-2 mt-2'>{i.title}</h1>
                      <p className='mb-2 mt-2'>{i.Desc}</p>
                      <div className='flex justify-evenly'>
                        <div className='flex-start'>
                          <button onClick={()=>handleDelete(i)} type='click' className='bg-red-500 text-white font-bold rounded py-2 px-2 mr-3' id='delete' >delete</button>
                      </div>
                      <div className='flex-end'>
                          <button onClick={()=>handleUpdateBtn(i)} type='click' className='bg-green-500 text-white font-bold rounded py-2 px-2 ' id='update' >Update</button>
                      </div>
                    </div>
                    </div>
                   
                  </div>
                </>
              )
            })
          }
          {/* <div class="py-4 flex justify-center">
          <div className='border block border-gray-200 rounded-lg max-w-sm shadow-md p-5 mb-10'>
            <h1 className='text-3xl font-bold underline-offset-4 pl-10 mb-2 mt-2'>Todo1</h1>
            <p className='mb-2 font-normal mt-2'>GeeksforGeeks aka GFG is an online platform
                  that provides Free Tutorials, Millions of
                  Articles, Live, Online and Classroom Courses,
                  Frequent Coding Competitions ,Webinars by
                  Industry Experts, Internship opportunities
                  and Job Opportunities.</p>
          </div>
          </div> */}


        </div>
      </div>)}

      

      
    </div>
    </>
  )
}
