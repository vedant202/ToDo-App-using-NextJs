import moongose from "mongoose";
import Connection  from "./db.js";
import Todo from "./todoModel.js";

export default async function getTodos(req,res){
    await Connection();

    try {
        const allTodo = await Todo.find({});
        console.log(allTodo)
        return res.status(200).json(allTodo)
    } catch (error) {
        return res.status(400).json("Failed to get all todos")
    }
    

}