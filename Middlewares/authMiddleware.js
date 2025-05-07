// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const Employer = require('../Models/Employer.model');
const dotenv = require('dotenv');
const UserModel=require('../Models/user.model')
dotenv.config();

// Protect route middleware
const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
     

      // First check if it's a user
      const user = await UserModel.findById(decoded.id)
        .populate("appliedJobs savedJobs resumes.jobId")
        .select("-password");

      if (user) {
        req.profile = user;
        req.user = user;
        req.role = "seeker";
       
        return next();
      }

      
      const employer = await Employer.findById(decoded.id)
        .populate("jobPosts")
        .select("-password");

      if (employer) {
        req.profile = employer;
        console.log(employer)
        req.employer = employer;
        req.role = "employer";
       
        return next();
      }

      // If neither found
      return res.status(401).json({ message: "User not found" });
    } catch (error) {
      
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const employerProtect = async (req, res, next) => {
  try {
    const admintoken = req.cookies.token;
    const token = req.headers.authorization?.split(' ')[1];

    if (admintoken) {
     
      const admindecoded = jwt.verify(admintoken, process.env.JWT_SECRET);
     

      
      if (admindecoded.role === "admin") {
        req.role = "admin";
        req.id = admindecoded.id;
     
        return next();
      }
      else if(admindecoded.role=='employer'){
      const employer = await Employer.findById(admindecoded.id);
      req.employer = employer;
      return next();
      }
      else{
        return res.redirect("/employerlogin")
      }
    }

    if (token) {
     
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const employer = await Employer.findById(decoded.id);
     
      if (!employer) {
        
        return res.redirect("/employerlogin")
        
      }
    
      req.employer = employer;
      return next();
      
    }

    // If neither token is valid
    return res.status(401).json({ message: "You Should Login As Recruiter To Post the Job" });

  } catch (err) {
    console.error("Middleware error:", err);
    return res.status(401).json({
      message: "Invalid User: Something went wrong with credentials",
      error: err.message
    });
  }
};



const allProtect = async (req, res, next) => {
  let token = req.cookies.token
 
  if (token) {
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          if(!decoded){
            return res.redirect('/Login')
          }
          next();
      } catch (error) {
          console.log(error.message)
          res.status(401).json({ message: 'Invalid token' });
      }
  } else {
      res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect, employerProtect ,allProtect};