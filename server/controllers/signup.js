
const user = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = async (req,res) => {
    const data = req.body;
    const emailCheck = await user.findOne({email : data.email});
    if(emailCheck){
        return res.status(200).json({
            message : "already registered",
        });
    }else{
        const hashPass = await bcrypt.hash(data.password,saltRounds);
        data.password = hashPass;
        const entry = await user.create(data);
        return res.status(200).json({
            message : "success",
        });
    }
}