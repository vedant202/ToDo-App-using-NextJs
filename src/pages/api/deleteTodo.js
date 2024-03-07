import Connection  from "./db.js";
import Todo from "./todoModel.js";


export default async function deleteTodo(req,res){
    Connection();
    const todo = req.body
    switch (req.method) {
        case "POST":
            console.log("Delete post method called");
            const deletedTodo = await Todo.deleteOne({_id:todo._id})
            console.log(deletedTodo);
            res.status(200).json("Deleted successfully")
            break;
    
        default:
            break;
    }
}