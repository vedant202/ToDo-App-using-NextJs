import moongose from "mongoose";

const toDoSchema = new moongose.Schema({
    title:{
        type:String
    },
    Desc:{
        type:String
    },
    createdBy:{
        type:String
    },
    deletedBy:{
        type:String,
        
    },
    updatedBy:{
        type:String,
    },
    isDeleted:{
        type:Boolean
    }
})
// const todo =  moongose.models?.ToDos || moongose.model("ToDos", toDoSchema);
const todo = moongose.models.ToDo || moongose.model("ToDo", toDoSchema) 
export default todo;