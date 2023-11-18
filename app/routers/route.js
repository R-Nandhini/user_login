let express = require("express");
let api = express.Router();

let userRoutes = require('./router/user');
let authRoutes = require('./router/auth');

api.use("/user", userRoutes);
api.use("/auth", authRoutes);


module.exports = api;