import moongose from 'mongoose'
const url = `mongodb+srv://vedantToDos:vedantToDos@todos.rkq9uab.mongodb.net/?retryWrites=true&w=majority`

const Connection = async()=>{
    try{
        await moongose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true

            });
            console.log("DB Connected Successfully");
    }
    catch(error){
        console.log( error.message)
    }
    // finally{
    //     moongose.connection.close()
    // }

        
}

export default Connection;