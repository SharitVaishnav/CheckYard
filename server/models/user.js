const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username :{
        type : String,
        require : true,
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    reg_machines : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "machines"
    }],
})

module.exports = mongoose.model("Users",userSchema);