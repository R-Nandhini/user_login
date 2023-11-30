var express = require("express");
var router = express.Router();
const { validationResult, check, query } = require("express-validator");

const auth = require('../../middlewares/auth');

var authController = require("../../controller/authController");


//post method
//this fn used for login
//http://localhost:4000/api/auth/login

router.post("/login",
    check("email", "Please include a valid email").isEmail(),
    check(
        "password",
        "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }), authController.loginUser);

//get method
//this fn used for login
//http://localhost:4000/api/auth/verify

router.get("/verify", auth, authController.verifyUser);
router.get("/refresh", auth, authController.verifyUser);

module.exports = router;


// 1. Login api
// 2. JWT Token authentication
// 3. Middleware
// 4. Validations