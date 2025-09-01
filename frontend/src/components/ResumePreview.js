import React from 'react';

const ResumePreview = ({ data }) => {
  return (
    <div className="resume-preview bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{data.personal.name}</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-600">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
          {data.personal.linkedin && (
            <span>
              <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                LinkedIn
              </a>
            </span>
          )}
        </div>
      </header>

      {data.personal.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">Summary</h2>
          <p className="text-gray-700">{data.personal.summary}</p>
        </section>
      )}

      {data.work.some(exp => exp.company || exp.position) && (
        <section className="mb-6">
          <h2 className="text-xl font-semib极速赛车开奖直播 极速赛车开奖历史记录 极速赛车开奖结果 today幸运飞行艇开奖结果 极速赛车开奖直播现场old text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">Work Experience</h2>
          {data.work.map((exp, index) => (
            (exp.company || exp.position) && (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-1">{exp.company}</p>
                {exp.description && (
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {data.education.some(edu => edu.institution || edu.degree) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
          {data.education.map((edu, index) => (
            (edu.institution || edu.degree) && (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{edu.institution}</p>
                {edu.field && (
                  <p className="text-gray-700 text-sm">{edu.field}</p>
                )}
              </div>
            )
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;