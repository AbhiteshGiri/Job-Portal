const express = require('express');
const {  createJob, updateJob, deleteJob } = require('../Controllers/JobController');
const { protect, employerProtect } = require('../Middlewares/authMiddleware');
const upload = require("../Middlewares/uploadMiddlewares")
const router = express.Router();
const job= require('../Models/job.model')
const {applyjob,getUserResumes,getLatestJobsByAppliedTitles}=require('../Controllers/userController')
const ApplicationModel=require('../Models/Application.model');
const mongoose=require('mongoose')
// router.get('/', getJobs);
// router.get('/:id', getJobById);
router.post('/create', employerProtect, upload.fields([{ name: 'companyLogo', maxCount: 1 }, { name: 'jobDescriptionFile', maxCount: 1 }]),createJob);
router.put('/update/:id', employerProtect, updateJob);
router.delete('/delete/:id', employerProtect, deleteJob);
router.post('/applyjob',protect,upload.single('resume'),applyjob)
router.post('/applyjob',protect,upload.single('resume'),applyjob)
router.get('/resumes', protect, getUserResumes);
router.get('/job-notification',protect,getLatestJobsByAppliedTitles)
router.get("/jobs", async (req, res) => {
    try {
      const { keyword, location } = req.query;
      const query = {};
  
      if (keyword) {
        query.$or = [
          { title: { $regex: keyword, $options: "i" } },
          { company: { $regex: keyword, $options: "i" } }
        ];
      }
  
      if (location) {
        query.location = { $regex: location, $options: "i" };
      }
  
      const jobs = await job.find(query);
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get("/job/:id", async (req, res) => {
    try {
  
      const jobdata = await job.findById({_id:req.params.id}); // ✅ First declare and assign

      if (!jobdata) {
        return res.status(404).json({ error: "Job not found" }); // ✅ Now this is safe
      }
  
      res.status(200).json(jobdata); // ✅ Return the job
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  router.get('/check-application/:jobId', protect, async (req, res) => {
    const { jobId } = req.params;
    const applicant = req.user.id;
  
    try {
      const existing = await ApplicationModel.findOne({
        job: new mongoose.Types.ObjectId(jobId),
        applicant: new mongoose.Types.ObjectId(applicant),
      });
  
      
  
      if (existing) {
        return res.json({ alreadyApplied: true });
      }
      res.json({ alreadyApplied: false });
    } catch (err) {
      console.error("Error checking application:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
module.exports = router;