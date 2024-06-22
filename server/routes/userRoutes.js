const express = require("express");
const router = express.Router();

const {login} = require("../controllers/login");
const {signup} = require("../controllers/signup");
const {machineRegister} = require("../controllers/machineRegister");
const {dashboard} = require("../controllers/dashboard");
const {mail} = require("../controllers/mail");
const {graph} = require("../controllers/graph");

router.post("/login",login);
router.post("/signup",signup);
router.post("/machineRegister",machineRegister);
router.get("/dashboard",dashboard);
router.post("/mail",mail);
router.get("/graph",graph);

module.exports = router;