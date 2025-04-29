require('dotenv').config();   // Load environment variables

const nodemailer = require('nodemailer');

// Create transporter using your Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,   // From .env
    pass: process.env.EMAIL_PASS    // From .env
  }
});

module.exports = transporter;
