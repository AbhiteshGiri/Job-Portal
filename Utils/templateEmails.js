// utils/templateEmails.js

// Universal CSS styles with subtle animation
const emailStyles = `
  <style>
    body {
      font-family: 'Arial', sans-serif;
      color: #333;
      background: #f7f7f7;
      padding: 20px;
    }
    .container {
      background: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(236, 24, 24, 0.1);
      max-width: 600px;
      margin: 0 auto;
      animation: fadeIn 1s ease-in-out;
    }
    h1, h2 {
      color: #0056b3;
      margin-bottom: 15px;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin-bottom: 8px;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .footer {
      margin-top: 30px;
      font-size: 14px;
      color: #888;
      text-align: center;
    }
      @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(to right, #e3f2fd, #ffffff);
      margin: 0;
      padding: 0;
    }

    .email-container {
      max-width: 650px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
      overflow: hidden;
      animation: fadeIn 1s ease-in-out;
    }

    .header {
      background: linear-gradient(135deg, #00bcd4, #2196f3);
      color: #fff;
      padding: 35px 25px;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .header h1 {
      margin: 0;
      font-size: 30px;
      letter-spacing: 1px;
      text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }

    .content {
      padding: 30px 25px;
      color: #333;
      background: #f8fbff;
    }

    .content p {
      margin: 15px 0;
      font-size: 16px;
      line-height: 1.6;
    }

    .info-box {
      background-color: #ffffff;
      border-left: 5px solid #2196f3;
      padding: 18px;
      margin: 25px 0;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(33, 150, 243, 0.1);
      transition: transform 0.3s ease;
    }

    .info-box:hover {
      transform: scale(1.02);
    }

    .info-box strong {
      display: block;
      margin-bottom: 5px;
      color: #0d47a1;
    }

    .footer {
      background-color: #e3f2fd;
      text-align: center;
      padding: 20px 25px;
      font-size: 14px;
      color: #555;
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .footer a {
      color: #1976d2;
      text-decoration: none;
      font-weight: bold;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 650px) {
      .email-container {
        margin: 20px;
      }

      .header h1 {
        font-size: 24px;
      }
    }
  </style>
`;

// Welcome Email Template
exports.welcomeRecruiterEmail = (name) => {
  return `
    <div style="font-family: Arial, sans-serif;   background: linear-gradient(135deg, #43cea2, #185a9d);color: #fff;padding: 20px;border-radius: 10px; padding: 30px; color: #ffffff;">
      <div style="max-width: 500px; margin: auto; background-color: #1a1a1a; border-radius: 10px; padding: 30px;">
        <h2 style="color: #00bcd4;">🚀 Welcome to Our Job Portal!</h2>
        <p style="color: #e0e0e0;">Hi <strong style="color: #ffffff;">${name}</strong>,</p>
        <p style="color: #cccccc;">
          We're thrilled to have you join us. Start posting jobs and find the right candidates quickly and easily.
        </p>
        <p style="color: #bdbdbd;">Access your dashboard to manage postings, review applicants, and more.</p>
        <br>
        <p style="color: #757575;">Wishing you successful hiring!<br><strong style="color: #ffffff;">Job Portal Team</strong></p>
      </div>
    </div>
  `;
};
exports.welcomeJobSeekerEmail = (name) => {
  return `
    <div style="font-family: Arial, sans-serif;   background: linear-gradient(135deg, #43cea2, #185a9d);color: #fff; padding: 20px; border-radius: 10px; padding: 30px; color: #ffffff;">
      <div style="max-width: 500px; margin: auto; background-color: #1a1a1a; border-radius: 10px; padding: 30px;">
        <h2 style="color: #4caf50;">🎉 Welcome to Our Job Portal!</h2>
        <p style="color: #e0e0e0;">Hi <strong style="color: #ffffff;">${name}</strong>,</p>
        <p style="color: #cccccc;">
          We're excited to have you on board! Start exploring new opportunities and take your career to the next level.
        </p>
        <p style="color: #bdbdbd;">Use the search tool to find jobs that match your skills and aspirations.</p>
        <br>
        <p style="color: #757575;">Happy job hunting!<br><strong style="color: #ffffff;">Job Portal Team</strong></p>
      </div>
    </div>
  `;
};

exports.jobPostConfirmation = (name, jobTitle) => {
  return `
    <div style="font-family: Arial, sans-serif;background: linear-gradient(135deg, #ff7e5f, #feb47b);color: #fff;padding: 20px;border-radius: 10px; padding: 30px; color: #ffffff;">
      <div style="max-width: 500px; margin: auto; background-color: #1a1a1a; border-radius: 10px; padding: 30px;">
        <h2 style="color: #ba68c8;">📢 Job Posted Successfully!</h2>
        <p style="color: #e0e0e0;">Hi <strong style="color: #ffffff;">${name}</strong>,</p>
        <p style="color: #cccccc;">Your job posting "<strong style="color: #ffffff;">${jobTitle}</strong>" is now live on our portal.</p>
        <br>
        <p style="color: #757575;">Regards,<br><strong style="color: #ffffff;">Job Portal Team</strong></p>
      </div>
    </div>
  `;
};

// Job Application Email Template
exports.jobApplicationConfirmation = (name, jobTitle) => {
  return `
    <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #6a11cb, #2575fc);color: white;padding: 20px;border-radius: 10px; padding: 30px; color: #ffffff;">
      <div style="max-width: 500px; margin: auto; background-color: #1a1a1a; border-radius: 10px; padding: 30px;">
        <h2 style="color: #42a5f5;">✅ Application Received</h2>
        <p style="color: #e0e0e0;">Hi <strong style="color: #ffffff;">${name}</strong>,</p>
        <p style="color: #cccccc;">Thank you for applying to the position of <strong style="color: #ffffff;">${jobTitle}</strong>.</p>
        <p style="color: #bdbdbd;">We’ve received your application and will get back to you soon.</p>
        <br>
        <p style="color: #757575;">Best wishes,<br><strong style="color: #ffffff;">Job Portal Team</strong></p>
      </div>
    </div>
  `;
};

// Recruiter Welcome Email Template
exports.recruiterWelcomeEmail = (name) => {
  return `
    ${emailStyles}
    <div class="container">
      <h1>Welcome ${name},</h1>
      <p>Thank you for joining our <strong>Job Portal</strong> as a recruiter!</p>
      <p>You can now post job openings and connect with qualified candidates effortlessly.</p>
      <p>We’re excited to be a part of your hiring journey!</p>
      <div class="footer">Best regards, <br>The Job Portal Team</div>
    </div>
  `;
};

// Admin Login Notification Email Template
exports.adminLoginNotificationEmail = (username, time, deviceInfo) => {
  return `
    ${emailStyles}
    <div class="container">
      <h2 style="color: #d9534f;">🔐 Admin Login Alert</h2>
      <p>Hello <strong>Admin</strong>,</p>
      <p>This is to inform you that someone has logged into the admin page.</p>
      <h3>Login Details:</h3>
      <ul>
        <li><strong>Username:</strong> ${username}</li>
        <li><strong>Login Time:</strong> ${time}</li>
        <li><strong>Device Information:</strong> ${deviceInfo}</li>
      </ul>
      <p>If this login was <strong>not authorized</strong>, please take immediate action to secure your account.</p>
      <div class="footer">Best regards, <br>The Job Portal Team</div>
    </div>
  `;
};

exports.sendContactEmail=(name,email,file,message,subject)=>{
return `
${emailStyles}
  <div class="email-container">
  <div class="header">
    <h1>New Contact Inquiry 📬</h1>
  </div>

  <div class="content">
    <p>Hello Admin,</p>
    <p>You have received a new contact request from ${email}:</p>

    <div class="info-box">
      <strong>Name:</strong> ${name}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Subject:</strong> ${subject}<br>
      <strong>Message:</strong>
      ${message}
    </div>

    ${file ? `<p><strong>Attachment:</strong> <a href="cid:${file.filename}">Download</a></p>` : ''}

    <p>Please respond as soon as possible.</p>
  </div>

  <div class="footer">
    © 2025 Your Job Portal. All rights reserved.<br>
    Need help? <a href="mailto:support@yourjobportal.com">Contact Support</a>
  </div>
</div>

`;
}