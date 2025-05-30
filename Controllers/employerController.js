const Employer=require('../Models/Employer.model');
const getdashboard = async (req, res) => {
    const { profile, role } = req;
  
    if (role === "seeker") {
      const latestActivity = [];
  
      const latestApplied = profile.appliedJobs[0];
      const latestSaved = profile.savedJobs[0];
  
      if (latestApplied) {
        latestActivity.push({
          description: `Applied to ${latestApplied.title}`,
          date: latestApplied.appliedAt ? new Date(latestApplied.appliedAt).toDateString() : "Unknown date",
        });
      }
  
      if (latestSaved) {
        latestActivity.push({
          description:` Saved job ${latestSaved.title}`,
          date: latestSaved.createdAt ? new Date(latestSaved.createdAt).toDateString() : "Unknown date",
        });
      } console.log()
     
      return res.json({
        name: profile.name,
        email: profile.email,
        role: "jobseeker",
        img:profile.image,
        profilePic:profile.profilePic,
        joined: profile.createdAt?.toDateString() || "Unknown",
        lastLogin: profile.updatedAt?.toDateString() || "Unknown",
        jobsApplied: profile.appliedJobs.length,
        appliedJobs:profile.appliedJobs,
        savedJobs: profile.savedJobs.length,
        seekerMsgCount: profile.message || 0,
        activities: latestActivity,
      });
    }
 
    if (role === "employer") {
      const latestActivity = [];
  
      const latestPosted = profile.jobPosts[0];
  
      if (latestPosted) {
        latestActivity.push({
          description: `Posted new job ${latestPosted.title}`,
          date: latestPosted.createdAt ? new Date(latestPosted.createdAt).toDateString() : "Unknown date",
        });
      }
      console.log(profile.jobPosts)
  
      return res.json({
        name: profile.name,
        email: profile.email,
        role: "recruiter",
        director:profile.director,
        joined: profile.createdAt?.toDateString() || "Unknown",
        lastLogin: profile.updatedAt?.toDateString() || "Unknown",
        jobsPosted: profile.jobPosts.length,
        companyLogo:profile.companyLogo,
        jobsPost:profile.jobPosts,
        totalApplicants: profile.jobPosts.reduce(
          (acc, job) => acc + (job.applicants?.length || 0),
          0
        ),
        recruiterMsgCount: profile.message || 0,
        activities: latestActivity,
      });
    }
  
    res.status(400).json({ message: "Invalid role" });
  };

  const savechanges = async (req, res) => {
    const { name, director } = req.body;
    const id = req.employer._id;
  
    try {
      const updatedEmployer = await Employer.findByIdAndUpdate(
        id,
        { name, director },
        { new: true } 
      );
  
      if (updatedEmployer) {
        res.status(200).json({ message: "Updated successfully" });
      } else {
        res.status(404).json({ message: "Employer not found" });
      }
  
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

module.exports={getdashboard,savechanges};