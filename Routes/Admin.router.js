const express = require('express');
const router = express.Router();
const {
  getUsers,
  deleteUser,
  getEmployers,
  deleteEmployer,
  getJobs,
  deleteJob,
  getApplications,editUsers,ChangeStatus,deleteApplicant
} = require('../Controllers/adminController');

const adminProtect = require('../Middlewares/adminprotect');

router.get('/users', adminProtect, getUsers);
router.put('/users', adminProtect, editUsers);
router.delete('/user/:id', adminProtect, deleteUser);
router.put('/job/:id/status',adminProtect,ChangeStatus)
router.get('/employers', adminProtect, getEmployers);
router.delete('/employer/:id', adminProtect, deleteEmployer);
router.delete('/application/:id',adminProtect,deleteApplicant)

router.get('/jobs', adminProtect, getJobs);
router.delete('/job/:id', adminProtect, deleteJob);

router.get('/applications', adminProtect, getApplications);

module.exports = router;