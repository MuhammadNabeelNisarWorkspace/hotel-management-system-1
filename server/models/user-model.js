const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: (true, { msg: "username is required" }),
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["guest", "admin", "receptionist", "housekeeper", "manager"],
    default: "guest",
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branches",
    required: false,
  },
});

// A Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Json Web Token Generation Method
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email.toString(),
        role: this.role.toString(),
      },
      "hotelmanagement",
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
