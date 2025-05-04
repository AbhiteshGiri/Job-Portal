const nodemailer = require('nodemailer');
const templates = require('./templateEmails');

// Configure a single transporter instance
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generic reusable email sender
const sendEmail = async (to, subject, html,file) => {
  await transporter.sendMail({
    from: `Job Portal <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments: [
      {
      
        content: file, // The file content as a buffer
        encoding: 'base64' // Or other encoding types based on your file
      }
    ]
    
  });
};

// Send Welcome Email
exports.welcomeJobSeekerEmail = (email, name) => {
  sendEmail(email, 'Successful Registration!', templates.welcomeJobSeekerEmail(name))
    .then(() => console.log('Welcome email sent!'))
    .catch(error => console.error('Error sending welcome email:', error));
};
exports.welcomeRecruiterEmail = (email, name) => {
  sendEmail(email, 'Successful Registration!', templates.welcomeRecruiterEmail(name))
    .then(() => console.log('Welcome email sent!'))
    .catch(error => console.error('Error sending welcome email:', error));
};

// Send Job Posting Confirmation Email
exports.jobPostConfirmation = (email,recruiterName, jobTitle) => {
  sendEmail(email, 'Congratulations: Your Job is Posted!', templates.jobPostConfirmation(recruiterName, jobTitle))
    .then(() => console.log('Job post email sent!'))
    .catch(error => console.error('Error sending job post email:', error));
};

// Send Job Application Confirmation Email
exports.jobApplicationConfirmation= (email,seekerName, jobTitle) => {
  sendEmail(email, 'Applied Successfully!', templates.jobApplicationConfirmation(seekerName, jobTitle))
    .then(() => console.log('Application email sent!'))
    .catch(error => console.error('Error sending application email:', error));
};

exports.sendAdminLoginNotification = (username, time, deviceInfo) => {
  const emailContent = templates.adminLoginNotificationEmail(username, time, deviceInfo); // Using the template
  sendEmail(process.env.ADMIN_EMAIL, 'Admin Login Alert', emailContent)
    .then(() => console.log('Admin login notification sent!'))
    .catch(error => console.error('Error sending admin login notification:', error));
};

exports.sendContactEmail = (name, email, subject, file, message) => {
  // Prepare the email content using templates
  const emailContent = templates.sendContactEmail(name, email, subject, message);

  // Send the email with the HTML content, subject, and attachment if present
  sendEmail(process.env.ADMIN_EMAIL, subject, emailContent, file)
    .then(() => console.log('Contact Email Sent'))
    .catch(error => console.error('Error sending Contact Mail:', error));
};


// Export the reusable sendEmail function if needed elsewhere
exports.sendEmail = sendEmail;
