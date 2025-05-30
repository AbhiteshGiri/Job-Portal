const Application = require('../Models/Application.model');
const Job = require('../Models/job.model')

// CREATE
const createJob = async (req, res) => {
  console.log("BODY:", req.body);
console.log("FILES:", req.file);

  try {
    const { body, files } = req;
   if(req.role=='admin'){
    const newJob = new Job({
      ...body,
     // Employer_id: req.id,
     logo: req.file?.filename || ''

     // jdFile: files?.jobDescriptionFile?.[0]?.filename || ''
      
    });
    const savedJob = await newJob.save();
    return  res.status(201).json(savedJob);
   }
   else{
    const newJob = new Job({
      ...body,
      Employer_id: req.employer._id,
     logo: req.file?.path|| ''
    });
    
    req.employer.jobPosts.push(newJob._id);
    await req.employer.save();
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
   }
    
  } catch (error) {
    res.status(500).json({ message:  error.message });
  }
};

// UPDATE
const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
  
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.Employer_id.toString() !== req.employer._id.toString()) {
      return res.status(403).json({ message: 'You can only update your own jobs' });
    }

    const { body, files } = req;
    if (files?.logo) body.logo = files.logo[0].filename;
    if (files?.jdFile) body.jdFile = files.jdFile[0].filename;

    const updatedJob = await Job.findByIdAndUpdate(jobId, body, { new: true });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Job update failed', error: error.message });
  }
};

// DELETE
const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.Employer_id.toString() !== req.employer._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own jobs' });
    }

    await Job.findByIdAndDelete(jobId);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Job deletion failed', error: error.message });
  }
};
const getApplicant = async (req, res) => {
  try {
    const { id } = req.params;
  console.log(id)
    const result = await Application.find({ job: id})
      .populate({
        path: "applicant",
        select: "name email"
      })
      .select("-job");
console.log(result)
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during fetch" });
  }
};

module.exports = { createJob, updateJob, deleteJob ,getApplicant};