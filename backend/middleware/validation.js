const validateResumeData = (req, res, next) => {
  const { resumeData } = req.body;
  
  if (!resumeData) {
    return res.status(400).json({
      success: false,
      error: 'Resume data is required'
    });
  }
  
  // Basic validation - can be expanded
  if (resumeData.personal && resumeData.personal.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resumeData.personal.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }
  }
  
  next();
};

module.exports = { validateResumeData };