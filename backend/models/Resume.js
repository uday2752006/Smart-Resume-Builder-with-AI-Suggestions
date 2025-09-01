const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  personal: {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    summary: {
      type: String,
      trim: true
    }
  },
  work: [{
    company: {
      type: String,
      trim: true
    },
    position: {
      type: String,
      trim: true
    },
    startDate: String,
    endDate: String,
    description: {
      type: String,
      trim: true
    }
  }],
  education: [{
    institution: {
      type: String,
      trim: true
    },
    degree: {
      type: String,
      trim: true
    },
    field: {
      type: String,
      trim: true
    },
    startDate: String,
    endDate: String
  }],
  skills: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
resumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Resume', resumeSchema);