//---------Resend otp at a time valid 2 minutes and only one time send a otp ---------------->>>

// const sendEmail = require('../utils/sendEmail');
// const { v4: uuidv4 } = require('uuid');

// let otpStore = {}; // In-memory store (can use DB or Redis for prod)

// exports.sendOTP = async (req, res) => {
//   const { email } = req.body;

//   if (!email) return res.status(400).json({ msg: "Email required" });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const expiresAt = Date.now() + 2 * 60 * 1000; // 2 min

//   otpStore[email] = { otp, expiresAt };

//   await sendEmail(email, "Your OTP Code", `Your OTP is: <b>${otp}</b>. It will expire in 2 minutes.`);

//   res.json({ msg: "OTP sent to your email" });
// };

// exports.verifyOTP = (req, res) => {
//   const { email, otp } = req.body;

//   const record = otpStore[email];

//   if (!record) return res.status(400).json({ msg: "No OTP sent to this email" });

//   if (Date.now() > record.expiresAt) {
//     delete otpStore[email];
//     return res.status(400).json({ msg: "OTP expired" });
//   }

//   if (record.otp !== otp) return res.status(400).json({ msg: "Invalid OTP" });

//   delete otpStore[email]; // clear after success
//   res.json({ msg: "OTP verified successfully ✅" });
// };


//---------Resend otp after 2 minutes---------------->>>

// controllers/otpController.js
const sendEmail = require("../utils/sendEmail");

let otpStore = {};
// otpStore[email] = { otp: '123456', expiresAt: 1650000000000 };

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email is required" });

  const record = otpStore[email];

  // 1️⃣ If there is an active (non-expired) OTP, tell them how many seconds remain
  if (record && Date.now() < record.expiresAt) {
    const secsLeft = Math.ceil((record.expiresAt - Date.now()) / 1000);
    return res.status(429).json({
      msg: `Please wait ${secsLeft} second(s) before requesting a new OTP`,
    });
  }

  // 2️⃣ Otherwise, generate a fresh OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes from now

  // 3️⃣ Store/overwrite
  otpStore[email] = { otp, expiresAt };

  // 4️⃣ Send email
  try {
    await sendEmail(
      email,
      "Your MERN‑Project OTP Code",
      `Your OTP is: <b>${otp}</b><br>This code will expire in 2 minutes.`
    );
    res.json({ msg: "OTP sent to your email" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ msg: "Could not send OTP. Try again later." });
  }
};

// ✅ This was wrongly placed inside sendOTP — now it’s correctly placed
exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];
  if (!record) return res.status(400).json({ msg: "No OTP sent to this email" });

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ msg: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  delete otpStore[email]; // clear after successful verification
  res.json({ msg: "OTP verified successfully ✅" });
};
