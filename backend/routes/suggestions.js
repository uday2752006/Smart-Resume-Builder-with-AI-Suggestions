const express = require('express');
const router = express.Router();
const { getSuggestions } = require('../controllers/aiController');

// POST get AI suggestions
router.post('/', getSuggestions);

module.exports = router;