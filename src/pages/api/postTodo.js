import moongose from "mongoose";
import Connection  from "./db.js";
import Todo from "./todoModel.js";

const url = `mongodb+srv://vedantToDos:vedantToDos@todos.rkq9uab.mongodb.net/?retryWrites=true&w=majority`

export default async function postTodo(req,res){
    await Connection();
    if(req.method==="POST"){
        console.log(req.body);
        
        


        try{
            // console.log({title:body.title,Desc:body.desc})
            const {title, desc,user} = req.body;
            // console.log(title , desc)
            const t = new Todo({title:title,Desc:desc,createdBy:user,updatedBy:null,deletedBy:null});
            console.log(t)
            // return

            const myTodo = await t.save()
            console.log(myTodo)
            // return

            res.status(200).json({message: "Group Created Successfuly",myTodo , success : true})
        }catch(error){
            console.log( "Error Message is :- ",error.message);
            res.status(400).json("Faild in creating a todo")
        }

        
    }
    else{
        res.json({success:false})
    }
}

// moongose.connect(url,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
//     );

//     const db = moongose.connection;
//     db.on("error", console.error.bind(console, "connection error: "));
//     db.once("open", function () {
//     console.log("Connected successfully");
//     });

//     const toDoSchema = moongose.Schema({
//         title:{
//             type:String
//         },
//         Desc:{
//             type:String
//         }
//     })
//     const User = moongose.model("ToDos", toDoSchema);
    
//     const u = new User(req.body)
//     try {
//         await u.save();
//         res.json({success:true})
//       } catch (error) {
//         res.status(500).json({success:false});
//       }
//       finally{
//         moongose.connection.close();
//       }