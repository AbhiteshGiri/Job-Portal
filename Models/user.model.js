const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    dob: { type: Date },
    gender: { type: String },
    qualification: { type: String },
    experience: { type: Number },
    skills: [{ type: String }],
    location: { type: String },
    linkedin: { type: String },
    profilePic:{type:String},
    resume: [{ type: Buffer }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    resetToken: String,
    resetTokenExpires: Date,
    resumes: [{
      jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
      resumeUrl: { type: String },
      appliedAt: { type: Date }
    }],
    role: { type: String, enum: ["seeker", "admin"], default: "seeker" },
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)

module.exports = User
