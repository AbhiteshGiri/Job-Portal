const mongoose=require('mongoose')

const employerSchema = new mongoose.Schema(
  {
    director:{type:String},
    name:{type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone:{type:Number},
    companyDetails:{type:String},
    otp: { type: String },  
    otpExpires: { type: Date },  
    isVerified: { type: Boolean, default: false },
    industry: { type: String },
    website: { type: String },
    companyLogo: { type: String },
    jobPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    role: { type: String, enum: ["employer", "admin"], default: "employer" },
  },
  { timestamps: true }
);

const Employer = mongoose.model("Employer", employerSchema);
module.exports= Employer;
