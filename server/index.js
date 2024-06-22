// server.js
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

const connect = require("./config/database");
connect();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const route = require("./routes/userRoutes");
app.use("/v1",route);

app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
});

app.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});