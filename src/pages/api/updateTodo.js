import Connection  from "./db.js";
import Todo from "./todoModel.js";

export default async function updateTodo(req,res){
    const todo = req.body;
    await Connection();

    switch (req.method){
        
        case "POST":
            console.log("Update to do");
            try{
                const updatedTodo = await Todo.findOneAndUpdate({_id:todo.todoId},{
                    title:todo.title,
                    Desc:todo.desc
                },{
                    new: true
                  })
                console.log(updatedTodo);
                res.status(200).json({Message:"Update successfully",updateTodo,success:true})
            }
            catch(error){
                res.status(400).json({Message:"Failed to update",success:false})
            }
            
        break;
    }
}