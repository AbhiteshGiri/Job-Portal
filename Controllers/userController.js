const Job = require('../Models/job.model.js');
const UserModel = require('../Models/user.model.js');
const path = require('path');
const fs = require('fs');
const Application = require('../Models/Application.model.js');
const sendEmailWithAttachment = require('../Utils/sendEmailWithAttachment.js');
const sendEmailAdmin = require('../Utils/sendEmailAdmin.js');
const mongoose=require('mongoose')
// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Save a job
const saveJob = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (!user.savedJobs.includes(job._id)) {
      user.savedJobs.push(job._id);
      await user.save();
    }

    res.json({ message: 'Job saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get saved jobs
const getSavedJobs = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json( user.savedJobs || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete resume
const deleteUserResume = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user || !user.resume) return res.status(404).json({ message: 'Resume not found' });

    const resumePath = path.join(__dirname, '..', user.resume);
    if (fs.existsSync(resumePath)) {
      fs.unlinkSync(resumePath);
    }

    user.resume = null;
    await user.save();

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const applyjob = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized: user not found' });
    }

    const { jobId, resumeId } = req.body;
    const userId = req.user.id;

    const job = await Job.findById(jobId).populate({ path: 'Employer_id', select: 'email' });
    if (!job) return res.status(400).json({ success: false, message: 'Job not found' });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    let resumePath = '';
    let selectedResume = null;

    if (req.file) {
      // New resume uploaded
      resumePath = req.file.path;
      user.resumes.push({
        jobId,
        resumeUrl: resumePath, // Local path
        appliedAt: new Date(),
      });
    } else if (resumeId && mongoose.Types.ObjectId.isValid(resumeId)) {
      // Using existing resume (Cloudinary or local)
      selectedResume = user.resumes.find(r => r._id.equals(resumeId));
      
      if (!selectedResume || (!selectedResume.resumeUrl && !selectedResume.path)) {
        console.log('Resume selection issue:', selectedResume);
        return res.status(400).json({ success: false, message: 'Selected resume is invalid or missing path/url' });
      }

      resumePath = selectedResume.resumeUrl || selectedResume.path;
    } else {
      return res.status(400).json({ success: false, message: 'No resume uploaded or selected' });
    }

    if (!user.appliedJobs.includes(jobId)) {
      user.appliedJobs.push(jobId);
    }

    await user.save();

    await Application.create({
      job: jobId,
      applicant: userId,
      resume: resumePath,
    });

    const employerEmail = job.Employer_id?.email;
    if (employerEmail && resumePath) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2E86C1;">New Application for "${job.title}"</h2>
          <p><strong>Candidate Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Applied At:</strong> ${new Date().toLocaleString()}</p>
          <p>Please find the resume URL below:</p>
          <p><a href="${resumePath}" target="_blank">Click here to view the resume</a></p>
        </div>
      `;

      await sendEmailWithAttachment(
        employerEmail,
        `New Job Application for ${job.title}`,
        emailHtml
      );
    }

    res.json({ success: true, message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ success: false, message: 'Error applying for job' });
  }
};


// Get User Resumes Controller
const getUserResumes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const resumes = user.resumes.map(resume => {
      const resumePath = resume.resumeUrl || resume.path;
      const isCloudinary = resumePath && resumePath.startsWith('https://res.cloudinary.com');

      return {
        _id: resume._id,
        jobId: resume.jobId,
        filename: isCloudinary ? resumePath.split('/').pop() : path.basename(resumePath || ''),
        url: resumePath,
        appliedAt: resume.appliedAt,
      };
    });

    res.json({ resumes });
  } catch (error) {
    console.error('Error getting resumes:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



// Get latest jobs based on titles the user applied to
const getLatestJobsByAppliedTitles = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate('appliedJobs');

    const appliedTitles = [...new Set(user.appliedJobs.map(job => job.title))];
    const userSkills = user.skills.flatMap(skill => skill.split(' ')); // Flatten skill strings like "java python"

    // Find jobs by title
    const titleBasedJobs = await Promise.all(
      appliedTitles.map(title =>
        Job.findOne({ title, status: 'Active' }).sort({ createdAt: -1 })
      )
    );

    // Find jobs matching any of the user's skills in their tags
    const skillBasedJobs = await Job.find({
      status: 'Active',
      tags: { $elemMatch: { $regex: new RegExp(userSkills.join('|'), 'i') } },
    }).sort({ createdAt: -1 });

    // Merge and remove duplicates based on _id
    const combinedJobs = [...titleBasedJobs.filter(Boolean), ...skillBasedJobs];
    const uniqueJobsMap = new Map();
    combinedJobs.forEach(job => uniqueJobsMap.set(job._id.toString(), job));

    const finalJobs = Array.from(uniqueJobsMap.values()).map(job => ({
      _id: job._id,
      title: job.title,
      location:job.location,
      jobType:job.jobType,
      company: job.company,
      createdAt: job.createdAt,
    }));

    res.status(200).json({ success: true, jobs: finalJobs });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
}; 

// Contact form email with attachment
const sendEmailContact = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Attachment is required' });
    }

    await sendEmailAdmin(name, email, message, subject, file);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};

const pushjob = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (!user.savedJobs.includes(job._id)) {
      user.savedJobs.push(job._id);
      await user.save();
    }

    res.json({ message: 'Job saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const popjob = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const jobId = req.params.jobId;

    user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
    await user.save();

    res.status(200).json({ message: 'Job unsaved' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getbookmarked= async(req,res)=>{
try {
    const user = await UserModel.findById(req.user.id).populate("savedJobs");
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    console.log(user.savedJobs)
    res.json( user.savedJobs || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
const manageJob=async (req,res)=>{
  if (req.role === 'seeker') {
    const appliedJobs = req.user.appliedJobs;
    return res.json({ type: 'seeker', jobs: appliedJobs });
  } else if (req.role === 'employer') {
    const jobPosts = req.employer.jobPosts;
    return res.json({ type: 'employer', jobs: jobPosts });
  } else {
    return res.status(403).json({ message: 'Unauthorized role' });
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
  saveJob,
  getSavedJobs,
  deleteUserResume,
  applyjob,
  getUserResumes,
  getLatestJobsByAppliedTitles,
  sendEmailContact,
  pushjob,
  popjob,
  getbookmarked,
  manageJob
};