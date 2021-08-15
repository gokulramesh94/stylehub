const Users = require("../models/user");
const AnonymousUsers = require("../models/anonymous");
const validator = require("../utils/validations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addUser = (req, res, next) => {
  const userInfo = req.body.user || {};
  const { username, password, firstname, lastname, phone, email, address } =
    userInfo;
  if (
    username &&
    password &&
    firstname &&
    lastname &&
    validator.validatePhoneNumber(phone) &&
    validator.validateEmail(email) &&
    address
  ) {
    Users.findOne({ username })
      .then(async (response) => {
        if (response) {
          var encryptedPassword = await bcrypt.hash(password, 10);
          response.password = encryptedPassword;
          response.firstname = firstname;
          response.lastname = lastname;
          response.phone = phone;
          response.email = email;
          response.address = address;
          await response.save();
          res.send("User already exists! Updated user data.");
        } else {
          //Encrypt user password
          var encryptedPassword = await bcrypt.hash(password, 10);
          const user = await Users.create({
            username,
            password: encryptedPassword,
            firstname,
            lastname,
            phone,
            email,
            address,
          });

          // Create token
          const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token;
          await user.save();

          // return new user
          res.status(201).send("Registration Successful!");
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({
          errorMsg: "Oops! Something went wrong. Could not add user.",
        });
      });
  } else {
    res.send({ errorMsg: "All fields are mandatory!" });
  }
};

exports.authenticateUser = async (req, res, next) => {
  const userInfo = req.body.user || {};
  const { username, password } = userInfo;
  if (username && password) {
    // Validate if user exist in database
    const user = await Users.findOne({
      username,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      await user.save();

      // user
      res.status(200).send({ username, token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } else {
    res.send({ errorMsg: "All fields are mandatory!" });
  }
};

exports.fetchUserInfo = async (req, res, next) => {
  const username = req.body.username || "";
  if (username) {
    // Validate if user exist in database
    const user = await Users.findOne({
      username,
    });
    if (user) {
      let { firstname, lastname, phone, email, address } = user;
      res.send({ firstname, lastname, phone, email, address });
    } else {
      res.send({ errorMsg: "username not found!" });
    }
  } else {
    res.send({ errorMsg: "Username is mandatory!" });
  }
};

exports.createAnonymousUser = async (req, res, next) => {
  const count = await AnonymousUsers.countDocuments();
  console.log("count : ", count);
  let username = "anonymous-" + count;
  const user = await AnonymousUsers.create({
    username,
  });

  // Create token
  const token = jwt.sign(
    { user_id: user._id, username },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  // save user token
  user.token = token;
  await user.save();

  // return new user
  return user;
};
