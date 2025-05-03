const express= require("express")
const app= express();
const dotenv=require("dotenv").config();
const connectDB=require("./Config/db")
connectDB();
const userRouter=require('./Routes/user.route')
const authRoute=require('./Routes/auth.route')
const path =require('path')
const cors=require('cors')
const job=require('./Routes/job.route');
const adminProtect=require('./Middlewares/adminprotect');
const all=require('./Middlewares/authMiddleware');
const cookieParser=require("cookie-parser");
const adminRouter=require("./Routes/Admin.router");
const useragent = require('express-useragent');
const employer= require('./Routes/employer.route')
app.use(useragent.express());
// middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:"http://127.0.0.1:5501" , // your frontend domain
    credentials: true
  }));
app.use('/job',job);
app.use('/user',userRouter)
app.use('/auth',authRoute)
app.use('/admin',adminRouter)
app.use('/employer',employer)
app.use(express.static((path.join(__dirname,'./Public'))));
app.use('/uploads/resume', express.static(path.join(__dirname, 'uploads/resume')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Public", "index.html"));
});
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./Public", "register.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./Public", "Login.html"));
});
app.get("/Login", (req, res) => {
  res.sendFile(path.join(__dirname, "./Public", "Login.html"));
});
app.get("/index2",all.allProtect,(req, res) => {
    res.sendFile(path.join(__dirname, "./Public", "index2.html"));
});
  app.get('/admin', adminProtect, (req, res) => {
    res.sendFile(path.join(__dirname, '/Admin', 'Admin.html'));
  });
  
  app.get('/otp', (req, res) => {
    res.sendFile(path.join(__dirname, './Public', 'otp.html')); // adjust path if needed
  });
  app.get('/browsejobs', (req, res) => {
    res.sendFile(path.join(__dirname, './Public', 'browse-jobs.html')); 
  });
  app.get('/job-details',all.allProtect,(req, res) => {
    res.sendFile(path.join(__dirname, './Public', 'job-details.html')); 
  });
  app.get('/dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname,'./Public','dashboard.html'));
  });
  app.get('/post-job',all.employerProtect,(req,res)=>{
    res.sendFile(path.join(__dirname, './Public', 'post-job.html'));
  });
app.listen(process.env.PORT,()=>{
    console.log("App is running on 3000")
})

