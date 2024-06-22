const user = require("../models/user");
const machines = require("../models/machines");
const jwt = require("jsonwebtoken");


exports.dashboard = async (req,res) => {

    async function fetchMachine(id){
        const data = await machines.findById(id);
        return data;
    }



    const data = req.query.token;
    const token = jwt.decode(data);
    const userData = await user.findById(token.id);
    const machine = await Promise.all(userData.reg_machines.map(async (machineId) => {
        return await machines.findById(machineId);
    }));
    return res.status(200).json({
        machine,
    });
}