const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const signup = async (req, res) => {
  try {
    const userSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      role: z.enum(["admin", "user"]),
    });

    const userData = userSchema.parse(req.body);
    const userExists = await User.findOne({ email: userData.email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User(userData);
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

const signin = async (req, res) => {
  try {
    const loginSchema = z.object({
      email: z.string().email("Invalid email format"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.errors || error.message });
  }
};

module.exports = {
  signup,
  signin,
};
