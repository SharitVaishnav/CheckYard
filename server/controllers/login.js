const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require("dotenv").config();


exports.login = async (req,res) => {
    const data = req.body;
    let emailCheck = await user.findOne({email : data.email});
    if(emailCheck){
        let match = false;
        match = await bcrypt.compare(data.password,emailCheck.password);
        const payload = {
            email : data.email,
            password : data.password,
            id : emailCheck._id,
            username : emailCheck.username
        };
        
        if(match === true){
            const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn : 60*60*24});
            emailCheck = emailCheck.toObject();
            emailCheck.token = token;
            return res.status(200).json({
                message : "Success",
                token
            });
        }
        else{
            return res.status(200).json({
                message : "Wrong Password",
            }); 
        }
    }else{
        res.status(200).json({
            message : "not registered",
        });
    }
}