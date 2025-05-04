const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASS        
  }
});


const sendEmailAdmin = async (name, email, message, subject, file) => {
    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 640px; margin: 40px auto; padding: 30px; border-radius: 16px; background: linear-gradient(145deg, #cfe8fc, #e6fffa); box-shadow: 0 20px 60px rgba(0,0,0,0.2); border: 1px solid #e0f2fe;">
  <h2 style="color: #0f172a; text-align: center; font-size: 28px; margin-bottom: 20px; text-shadow: 1px 1px 4px rgba(0,0,0,0.15); letter-spacing: 1px;">📬 You Have a New Message!</h2>
  <div style="background: #ffffff; padding: 25px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.08);">
    <p style="font-size: 16px; margin-bottom: 10px;"><strong style="color: #1e293b;">👤 Name:</strong> ${name}</p>
    <p style="font-size: 16px; margin-bottom: 10px;"><strong style="color: #1e293b;">📧 Email:</strong> ${email}</p>
    <p style="font-size: 16px; margin-bottom: 10px;"><strong style="color: #1e293b;">📌 Subject:</strong> ${subject}</p>
    <p style="font-size: 16px; margin-bottom: 10px;"><strong style="color: #1e293b;">💬 Message:</strong></p>
    <div style="margin: 16px 0; padding: 18px; background: #f9fafb; border-left: 6px solid #3b82f6; box-shadow: inset 0 2px 6px rgba(0,0,0,0.05); white-space: pre-wrap; font-size: 15px; color: #334155;">
     ${message}
      Regards,
      ${name}
    </div>
  </div>
  <p style="text-align: center; margin-top: 30px; font-size: 14px; color: #64748b; font-style: italic;">
    This message was sent via your website contact form.
  </p>
</div>

      `,
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype
        }
      ]
    };

  return transporter.sendMail(mailOptions);
};

module.exports=sendEmailAdmin