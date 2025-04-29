const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Job Portal Verification",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Your OTP Code</title>
        <style>
          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }
          @keyframes pulse {
            0% { background-color: #ffffff; }
            50% { background-color: #f0f8ff; }
            100% { background-color: #ffffff; }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:#f9f9f9; font-family:Arial, sans-serif; animation: fadeIn 1.5s ease;">
  
        <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; margin-top:40px; border-radius:12px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); animation: fadeIn 2s ease;">
          <tr>
            <td align="center" style="background:linear-gradient(135deg, #667eea, #764ba2); padding:30px 20px;">
              <h1 style="color:#ffffff; margin:0; font-size:28px;">🔒 One-Time Password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 40px; text-align:center; color:#333333;">
              <p style="font-size:18px; margin-bottom:20px;">Hello <strong style="color:#667eea;">${email}</strong>,</p>
              <p style="font-size:16px; margin-bottom:30px;">Your OTP for verification is:</p>
  
              <div style="display:inline-block; padding:15px 30px; background-color:#667eea; color:#ffffff; border-radius:8px; font-size:28px; font-weight:bold; letter-spacing:4px; animation:pulse 2s infinite;">
                ${otp}
              </div>
  
              <p style="margin-top:30px; font-size:14px; color:#777;">This OTP is valid for the next 5 minutes. Do not share it with anyone.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px; background-color:#f0f0f0; font-size:13px; color:#999;">
              <p style="margin:0;">If you didn't request this, please ignore this email.</p>
              <p style="margin:0;">© 2025 JobPortal. All rights reserved.</p>
            </td>
          </tr>
        </table>
  
      </body>
      </html>
    `
  };
  

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
