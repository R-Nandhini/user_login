let express = require("express");
let api = express.Router();

let userRoutes = require('./router/user');
api.use("/user", userRoutes);


module.exports = api;