const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "You are not logged in! Please log in to get access." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        message: "User no longer exists.",
      });
    }

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again." });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

const restrictTo = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res
      .status(403)
      .json({ message: "You do not have permission to perform this action" });
  }
  next();
};

module.exports = {
  protect,
  restrictTo,
};
