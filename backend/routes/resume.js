const express = require('express');
const router = express.Router();
const {
  getResume,
  saveResume,
  deleteResume,
  getAllResumes
} = require('../controllers/resumeController');

// GET resume by user ID
router.get('/:userId', getResume);

// GET all resumes for user
router.get('/all/:userId', getAllResumes);

// POST save resume
router.post('/save', saveResume);

// DELETE resume
router.delete('/:userId', deleteResume);

module.exports = router;