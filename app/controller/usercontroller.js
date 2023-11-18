const pool = require("../../database");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { validationResult, check, query } = require("express-validator");

const { v4: uuidv4 } = require("uuid");

module.exports.createUser = async function (req, res) {
  res.send("You reached create route of user");
};

module.exports.createTable = async function (req, res) {
  const tableName = req.body["tablename"];

  const createTableQuery = `create table users (userid VARCHAR(100) primary key, name VARCHAR(50),email VARCHAR(100) not null, password VARCHAR(200) not null, usertype VARCHAR(10) not null )`;
  try {
    const resp = await pool.query(createTableQuery);
    console.log(resp);
    res.send(`${tableName} Table created successfully`);
  } catch (error) {
    console.log(error);
  }
};

module.exports.insertData = async function (req, res) {
  const errors = validationResult(req);
  console.log({ errors });

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // uuid is used to generate unique id
  const userId = uuidv4();
  const { name, password, email, userType } = req.body;

  const findUserByEmailQuery = `select * from users where email='${email}'`;

  try {
    let user = await pool.query(findUserByEmailQuery);
    console.log(user.rows.length, user.rows.length > 0);

    if (user.rows.length > 0) {
      return res.status(400).json({ error: [{ msg: "user already present" }] });
    }

    const salt = await bcrypt.genSalt(10);
    console.log({ salt });

    let hashedPassword = await bcrypt.hash(password, salt);

    const createUserQuery = `insert into users values('${userId}','${name}','${email}','${hashedPassword}','${userType}')`;

   const resp = await pool.query(createUserQuery);
    const payload = {
      user: {
        id: userId
      }
    };

    var token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: payload
      },
      "jwtSecret123"
    );

    if (token) {
      res.status(200).json({ token });
    }

    console.log({ token });

  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

module.exports.updateData = async function (req, res) {
  const id = req.params.id;
  const { sname, phono } = req.body;
  const updateData = `update users set sname ='${sname}', phono ='${phono}' where sid ='${id}'`;
  //const updatesuser =`update users set sname='Nandy', phono='657894356' where sid= '${id}'`
  try {
    const data = await pool.query(updateData);
    console.log(data);
    res.json("data updated successfully");
  } catch (error) {
    console.log(error);
    res.send("Error fetchig data");
  }
};
