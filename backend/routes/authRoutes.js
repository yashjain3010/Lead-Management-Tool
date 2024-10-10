const express = require("express");
const authController = require("../controllers/authController");
const inputValidation = require("../middleware/inputValidation");
const router = express.Router();

router.post(
  "/signup",
  inputValidation.validateUserInput,
  authController.signup
);
router.post(
  "/signin",
  inputValidation.validateUserInput,
  authController.signin
);

module.exports = router;
