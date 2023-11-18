var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
var userController = require("../../controller/usercontroller");

//post method
//this fn user for create user
//http://localhost:4000/api/user/create
router.post("/create", userController.createUser);

//post method
//this fn user for create table
//http://localhost:4000/api/user/create-table
router.post("/create-table", userController.createTable);

//post method
//this fn user for create table
//http://localhost:4000/api/user/insert-data
router.post(
  "/insert-data",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  userController.insertData
);

//post method
//this fn user for create table
//http://localhost:4000/api/user/update-data/2
router.put("/update-data/:id", userController.updateData);

module.exports = router;

// 1. Login api
// 2. JWT Token authentication
// 3. Middleware
// 4. Validations
