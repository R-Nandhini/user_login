var express = require("express");
var router = express.Router();

var authController = require("../../controller/authController");


//post method
//this fn used for login
//http://localhost:4000/api/auth/login

router.post("/login", authController.loginUser);

module.exports = router;


// 1. Login api
// 2. JWT Token authentication
// 3. Middleware 
// 4. Validations