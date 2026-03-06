import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true 
    },
    access : {
         type : String,
        required : true 
    }
});

const Userdata = mongoose.model('Userdata',loginSchema);

export default  Userdata;