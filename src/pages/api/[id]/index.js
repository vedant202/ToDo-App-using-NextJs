import Connection  from "../db.js";
import Todo from "../todoModel.js";

export default async function index(req,res){
    await Connection();
    console.log(req.query);
    const {id} = req.query;
    try {
        const getTodo = await Todo.find({_id:id});
        res.status(200).json({success:true,getTodo})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({success:false})
    }
    
}