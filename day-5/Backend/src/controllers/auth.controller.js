const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const redis = require("../config/cache");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }]
    });

    if (isAlreadyRegistered) {
      return res.status(400).json({
        message: "Username or email already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!password || (!email && !username)) {
      return res.status(400).json({
        message: "Email/username and password are required"
      });
    }

    // Build query dynamically so undefined fields are never passed into $or
    const query = [];
    if (email) query.push({ email });
    if (username) query.push({ username });

    const user = await userModel.findOne({ $or: query }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id);
    return res.status(200).json({
      message: "User fetched successfully",
      user
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function logoutUser(req, res) {
  try {
    const token = req.cookies.token;
    res.clearCookie("token");

    if (token) {
      await redis.set(token, Date.now().toString(), "EX", 60 * 60 * 24 * 3);
    }

    return res.status(200).json({
      message: "User logged out successfully"
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser, getMe, logoutUser };