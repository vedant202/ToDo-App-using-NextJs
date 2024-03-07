import moongose from "mongoose";

const User = new moongose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    pass:{
        type:String
    },
    isDeleted:{
        type:Boolean
    }
});

const UserModal = moongose.models.Users || moongose.model("Users",User);

export default UserModal;