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
