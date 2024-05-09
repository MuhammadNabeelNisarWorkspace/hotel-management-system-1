const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, role } = req.body;

    // Check if user with the same email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exists!" });
    }
    // Else
    const userCreated = await User.create({
      username,
      email,
      password,
      phoneNumber,
      role,
    });

    res.status(201).json({
      msg: "Registration successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking if user exists
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials!" });
    }

    // Password comparison Compare
    const passwordMatch = await userExist.comparePassword(password);

    if (passwordMatch) {
      res.status(200).json({
        msg: "Login successful!",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email Or Password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

module.exports = { home, register, login };
