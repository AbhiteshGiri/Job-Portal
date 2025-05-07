const express = require('express');
const  {getdashboard,savechanges }= require('../Controllers/employerController');
const { employerProtect,protect } = require('../Middlewares/authMiddleware');
const router = express.Router();

// router.get('/my-jobs', employerProtect, getEmployerJobs);
// router.get('/applicants/:jobId', employerProtect, getApplicants);
router.post('/savechanges',protect,savechanges)
router.get('/dashboard',protect,getdashboard)
module.exports = router;