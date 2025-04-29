// controllers/userController.js
const Job = require('../Models/job.model.js');
const UserModel=require('../Models/user.model.js')
const path = require('path');
const fs = require('fs');
const Application=require('../Models/Application.model.js');
const sendEmail = require("../Utils/sendemail");
const sendEmailWithAttachment=require('../Utils/sendEmailWithAttachment.js');
// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Save Job
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

// Get Saved Jobs
const getSavedJobs = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).populate('savedJobs');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.savedJobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};




// Delete Resume
const deleteUserResume = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user || !user.resume) return res.status(404).json({ message: 'Resume not found' });

        const resumePath = path.join(__dirname, '..', user.resume);

        // Delete file from local storage
        if (fs.existsSync(resumePath)) {
            fs.unlinkSync(resumePath);
        }

        // Remove resume from database
        user.resume = null;
        await user.save();

        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const applyjob = async (req, res) => {
  try {
    const { jobId, resumeId } = req.body;
    const userId = req.user.id;

    const job = await Job.findById(jobId).populate({
      path: 'Employer_id',
      select: 'email'
    });
    
  
    if (!job) return res.status(400).json({ success: false, message: 'Job not found' });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(400).json({ success: false, message: 'User not found' });

    let resumePath = null;

    if (req.file) {
      resumePath = req.file.path;
      user.resumes.push({
        jobId,
        resumeUrl: resumePath,
        appliedAt: new Date(),
      });
    } else if (resumeId) {
      const selectedResume = user.resumes.find(r => r._id.toString() === resumeId);
      if (!selectedResume) {
        return res.status(400).json({ success: false, message: 'Selected resume not found' });
      }
      resumePath = selectedResume.resumeUrl;
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
  
    if (employerEmail) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2E86C1;">New Application for "${job.title}"</h2>
          <p><strong>Candidate Name:</strong> ${user.name}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Applied At:</strong> ${new Date().toLocaleString()}</p>
          <p>Please find the attached resume.</p>
        </div>
      `;

      await sendEmailWithAttachment(
        employerEmail,
        `New Job Application for ${job.title}`,
        emailHtml,
        [
          {
            filename: 'Resume.pdf',
            path: resumePath, // should be a local file path (e.g., uploads/resume123.pdf)
            contentType: 'application/pdf',
          },
        ]
      );
    }

    res.json({ success: true, message: 'Application submitted and email sent!' });

  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ success: false, message: 'Error applying for job' });
  }
};
  const getUserResumes = async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id);
  
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const resumes = user.resumes.map(resume => {
        const filename = path.basename(resume.resumeUrl); // just the file name
        return {
          _id: resume._id,
          jobId: resume.jobId,
          filename,
          url: `/uploads/resumes/${filename}`, // for frontend
          appliedAt: resume.appliedAt,
        };
      });
  
      res.json({ resumes });
    } catch (error) {
      console.error('Error getting resumes:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  const getLatestJobsByAppliedTitles = async (req, res) => {
    try {
      const userId = req.user._id
  
      const user = await UserModel.findById(userId).populate('appliedJobs');
  
      const uniqueTitles = [
        ...new Set(user.appliedJobs.map(job => job.title))
      ];
  
      const latestJobs = await Promise.all(
        uniqueTitles.map(title =>
          Job.findOne({ title ,status: 'Active'}).sort({ createdAt: -1 }) // sort by latest created
        )
      );
  
      const filtered = latestJobs
        .filter(job => job)
        .map(job => ({
          _id: job._id,
          title: job.title,
          company: job.company,
          createdAt: job.createdAt, // include timestamp
        
        }));
  console.log(filtered)
  
      res.status(200).json({ success: true, jobs: filtered });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  };
module.exports = { getUserProfile, updateUserProfile, saveJob, getSavedJobs , deleteUserResume,applyjob,getUserResumes,getLatestJobsByAppliedTitles};
