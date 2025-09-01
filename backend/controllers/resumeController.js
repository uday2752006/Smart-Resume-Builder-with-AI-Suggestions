const Resume = require('../models/Resume');

// Get resume by user ID
exports.getResume = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const resume = await Resume.findOne({ userId });
    
    if (!resume) {
      return res.status(404).json({ 
        success: false, 
        message: 'Resume not found' 
      });
    }
    
    res.json({ 
      success: true, 
      resume 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Save resume
exports.saveResume = async (req, res) => {
  try {
    const { userId, resumeData } = req.body;
    
    let resume = await Resume.findOne({ userId });
    
    if (resume) {
      // Update existing resume
      resume = await Resume.findOneAndUpdate(
        { userId },
        { ...resumeData, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
    } else {
      // Create new resume
      resume = new Resume({ userId, ...resumeData });
      await resume.save();
    }
    
    res.json({ 
      success: true, 
      message: 'Resume saved successfully',
      resume 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Delete resume
exports.deleteResume = async (req, res) => {
  try {
    const { userId } = req.params;
    
    await Resume.findOneAndDelete({ userId });
    
    res.json({ 
      success: true, 
      message: 'Resume deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// Get all resumes for a user (if multiple resumes feature is added)
exports.getAllResumes = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });
    
    res.json({ 
      success: true, 
      resumes 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};