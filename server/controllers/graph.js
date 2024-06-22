const user = require("../models/user");
const machines = require("../models/machines");
const jwt = require("jsonwebtoken");


exports.graph = async (req,res) => {

    const machine1 = req.query.machineId;
    const machineData = await machines.findById(machine1);
    console.log(machineData)
    return res.status(200).json({
        machineData,
    });
}