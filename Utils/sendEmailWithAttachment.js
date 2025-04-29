const nodemailer = require('nodemailer');

const sendEmailWithAttachment = async (to, subject, htmlContent, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlContent,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmailWithAttachment;