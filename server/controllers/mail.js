const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.mail = (req,res) => {
    const data = req.body.token;
    const token = jwt.decode(data);
    const machineId = req.body.statusData.ID;
    const machineName = req.body.name;

    console.log(token.email);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: token.email,
        subject: "Maintenance Needed",
        text: `Hello user ${token.username} your machine ${machineName} with ID : ${machineId} requires imediate maintanance`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });

}

