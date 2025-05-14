const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MERN Project" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `<p>${message}</p>`,
    });

    console.log("✅ Email sent to", email);
  } catch (err) {
    console.error("❌ Email not sent", err);
  }
};

module.exports = sendEmail;
