const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { sendOTP, verifyOTP } = require("../controllers/otpController");

//Register and Login
router.post("/register", register);
router.post("/login", login);

//OTP
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

module.exports = router;
