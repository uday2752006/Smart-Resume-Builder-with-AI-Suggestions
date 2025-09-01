import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import PersonalInfo from './PersonalInfo';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import ResumePreview from './ResumePreview';

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      summary: ''
    },
    work: [
      {
        id: 1,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        id: 1,
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
      }
    ],
    skills: [],
    newSkill: ''
  });
  const [suggestions, setSuggestions] = useState({});
  const [isPreview, setIsPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updatedArray = [...resumeData[section]];
      updatedArray[index][field] = value;
      setResumeData({ ...resumeData, [section]: updatedArray });
    } else {
      setResumeData({
        ...resumeData,
        [section]: { ...resumeData[section], [field]: value }
      });
    }
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      work: [
        ...resumeData.work,
        {
          id: Date.now(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    });
  };

  const removeWorkExperience = (id) => {
    setResumeData({
      ...resumeData,
      work: resumeData.work.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: ''
        }
      ]
    });
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    if (resumeData.newSkill.trim() !== '') {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, resumeData.newSkill.trim()],
        newSkill: ''
      });
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills.splice(index, 1);
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const getAISuggestions = async (section) => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockSuggestions = {
        personal: "Consider adding a more professional email address and a link to your LinkedIn profile.",
        work: "Try using more action verbs like 'developed', 'managed', or 'implemented' to start your bullet points.",
        education: "Include your GPA if it's above 3.0 and relevant coursework if you're a recent graduate.",
        skills: "Consider adding industry-specific keywords that match job descriptions you're targeting."
      };
      
      setSuggestions({...suggestions, [section]: mockSuggestions[section]});
      toast.success('AI suggestions generated!');
    } catch (error) {
      toast.error('Failed to generate suggestions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToPDF = () => {
    toast.success('Exporting to PDF...');
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold">Smart Resume Builder</h1>
          <p className="text-indigo-100 mt-2">Create a professional resume with AI-powered suggestions</p>
        </header>

        <div className="flex flex-col md:flex-row">
          <nav className="md:w-1/4 bg-gray-50 p-4 border-r">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('personal')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === 'personal' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'}`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('work')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === 'work' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'}`}
              >
                Work Experience
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === 'education' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'}`}
              >
                Education
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${activeTab === 'skills' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'hover:bg-gray-100'}`}
              >
                Skills
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                {isPreview ? 'Edit Resume' : 'Preview Resume'}
              </button>
              <button
                onClick={exportToPDF}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Export to PDF
              </button>
            </div>

            {suggestions[activeTab] && (
              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-medium text-yellow-800">AI Suggestions</h3>
                <p className="text-sm text-yellow-700 mt-2">{suggestions[activeTab]}</p>
              </div>
            )}
          </nav>

          <main className="md:w-3/4 p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 100px)' }}>
            {isPreview ? (
              <ResumePreview data={resumeData} />
            ) : (
              <>
                {activeTab === 'personal' && (
                  <PersonalInfo
                    data={resumeData.personal}
                    onChange={(field, value) => handleInputChange('personal', field, value)}
                    onGetSuggestions={() => getAISuggestions('personal')}
                    isGenerating={isGenerating}
                  />
                )}

                {activeTab === 'work' && (
                  <WorkExperience
                    experiences={resumeData.work}
                    onChange={(index, field, value) => handleInputChange('work', field, value, index)}
                    onAdd={addWorkExperience}
                    onRemove={removeWorkExperience}
                    onGetSuggestions={() => getAISuggestions('work')}
                    isGenerating={isGenerating}
                  />
                )}

                {activeTab === 'education' && (
                  <Education
                    education={resumeData.education}
                    onChange={(index, field, value) => handleInputChange('education', field, value, index)}
                    onAdd={addEducation}
                    onRemove={removeEducation}
                    onGetSuggestions={() => getAISuggestions('education')}
                    isGenerating={isGenerating}
                  />
                )}

                {activeTab === 'skills' && (
                  <Skills
                    skills={resumeData.skills}
                    newSkill={resumeData.newSkill}
                    onChange={(value) => setResumeData({...resumeData, newSkill: value})}
                    onAdd={addSkill}
                    onRemove={removeSkill}
                    onGetSuggestions={() => getAISuggestions('skills')}
                    isGenerating={isGenerating}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;