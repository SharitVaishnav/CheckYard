const mongoose = require("mongoose");

const machineSchema = mongoose.Schema({
    name :{
        type : String,
        require : true,
    },
    LifeCycle : {
        type : String,
        required : true,
    },
    TotalUsedCycle : {
        type : String,
        required : true,
    },
    data : {
        type : Object,
        required : true,
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    currentCondition : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model("Machines",machineSchema);