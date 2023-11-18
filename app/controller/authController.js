const pool = require("../../database");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult, check, query } = require("express-validator");

module.exports.loginUser = async function (req, res) {
  res.send("You reached create route of auth");
};
