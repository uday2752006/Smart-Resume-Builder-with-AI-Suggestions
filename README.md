## Smart Resume Builder with AI Suggestions
A modern, responsive web application for creating professional resumes with AI-powered suggestions. Built with React.js, Node.js, Express, MongoDB, and OpenAI API.

## Features
Interactive Resume Builder - Easy-to-use forms for personal info, work experience, education, and skills

AI-Powered Suggestions - Get intelligent recommendations to improve your resume content

Real-time Preview - See your resume update as you type

PDF Export - Download your resume as a professional PDF document

Multiple Templates - Choose from different resume templates (coming soon)

Responsive Design - Works perfectly on desktop, tablet, and mobile devices

Cloud Storage - Save your resumes securely in the database

## Tech Stack
**Frontend**
React.js - UI framework

Tailwind CSS - Styling and responsive design

React Hot Toast - Notifications

HTML2PDF/jsPDF - PDF generation

**Backend**
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM for MongoDB

OpenAI API - AI suggestions

JWT - Authentication

## Prerequisites
Before running this project, make sure you have installed:

Node.js (v14 or higher) - Download here

MongoDB (local installation or MongoDB Atlas account)

OpenAI API account - Sign up here

## Quick Start
1. Clone or Download the Project
bash
# Create project directory
mkdir smart-resume-builder
cd smart-resume-builder
2. Frontend Setup
bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
The frontend will be available at: http://localhost:3000

3. Backend Setup
bash
# Open a new terminal and navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and add your configuration
# (See Environment Variables section below)

# Start the backend server
npm run dev
The backend will be available at: http://localhost:5000

## Environment Variables
Backend (.env file)
Create a .env file in the backend directory:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resumeBuilder
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
NODE_ENV=development
Getting OpenAI API Key
Sign up at OpenAI Platform

Go to API Keys section

Create a new secret key

Copy and paste it in your .env file

## Project Structure
text
smart-resume-builder/
├── frontend/                 # React.js frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeBuilder.js
│   │   │   ├── PersonalInfo.js
│   │   │   ├── WorkExperience.js
│   │   │   ├── Education.js
│   │   │   ├── Skills.js
│   │   │   └── ResumePreview.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Node.js backend
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── resumeController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   └── Resume.js
│   ├── routes/
│   │   ├── resume.js
│   │   ├── suggestions.js
│   │   └── auth.js
│   ├── utils/
│   │   └── pdfGenerator.js
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── README.md
└── README.md

## API Endpoints
Resume Routes
GET /api/resume/:userId - Get resume by user ID

POST /api/resume/save - Save resume data

DELETE /api/resume/:userId - Delete resume

GET /api/resume/all/:userId - Get all user resumes

AI Suggestions
POST /api/suggestions - Get AI suggestions for resume improvement

Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

## Database Schema
The resume data is stored with the following structure:

javascript
{
  userId: String,
  personal: {
    name: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    summary: String
  },
  work: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String
  }],
  skills: [String],
  createdAt: Date,
  updatedAt: Date
}

# Deploy the build folder to your preferred platform
Backend Deployment (Heroku/Railway)
Set environment variables in your hosting platform

Connect your GitHub repository

Deploy automatically or manually

MongoDB Setup
Option 1: Local MongoDB
Install MongoDB locally

Start MongoDB service

Use mongodb://localhost:27017/resumeBuilder as MONGODB_URI

Option 2: MongoDB Atlas (Cloud)
Create account at MongoDB Atlas

Create a new cluster

Get connection string

Update MONGODB_URI in .env file

## Troubleshooting
Common Issues
Frontend won't start:

bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
Backend connection errors:

Check if MongoDB is running

Verify connection string in .env file

Tailwind CSS not working:

bash
# Reinstall Tailwind
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
OpenAI API errors:

Check if API key is valid

Verify billing is set up in OpenAI account

Port Conflicts
If ports 3000 or 5000 are occupied:

bash
# Frontend on different port
npm start -- --port 3001

# Backend on different port
# Update PORT in .env file

## Usage Guide
Start both frontend and backend servers

Open your browser to http://localhost:3000

Fill in your information in the forms

## Development
Adding New Features
Create new components in frontend/src/components/

Add new API routes in backend/routes/

Update models if needed in backend/models/

Test thoroughly before deployment

## Author 
[Udaya Sai Devu]

## License
This project is licensed under the MIT License - see the LICENSE file for details.
