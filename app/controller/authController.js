const pool = require("../../database");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
//const config = require("config");
const { validationResult, check, query } = require("express-validator");

module.exports.loginUser = async function (req, res) {

  const { email, password } = req.body;

  const errors = validationResult(req);


  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const findUserByEmailQuery = `select * from users2 where email='${email}'`;
    let user = await pool.query(findUserByEmailQuery);
    //
    if (!user.rows.length > 0) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] })
    }

    let foundUser = user.rows[0];
    let isMatch = await bcrypt.compare(password, foundUser.password)
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Password incorrect" }] })
    }

    const payload = {
      user: {
        id: foundUser.userid
      }
    }

    var accesstoken = jwt.sign ( payload , "jwtSecret123", { expiresIn: '1h' });
    var refreshtoken = jwt.sign( payload, "jwtSecret123", { expiresIn: '1d' });

    if (accesstoken) {
      res.status(200).json({ accesstoken, refreshtoken });
    }


  } catch (error) {
    console.log({ error });
    res.status(500).send('Server error');
  }


};


module.exports.verifyUser = async function (req, res) {

  console.log("verfication user ");

  // const findUserByEmailQuery = `select email,name,userid,usertype from users2 where userid='${req.user.id}'`;
  // let user = await pool.query(findUserByEmailQuery);


  // res.send({ user:user.rows[0] })
  res.send("check")

}


