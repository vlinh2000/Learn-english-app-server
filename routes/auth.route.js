var express = require("express");
const router = express.Router();

//controllers
const authController = require("../controllers/auth.controller");

router.post("/", authController.login);


module.exports = router;