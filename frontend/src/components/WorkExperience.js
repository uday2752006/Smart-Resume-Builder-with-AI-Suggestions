import React from 'react';

const WorkExperience = ({ experiences, onChange, onAdd, onRemove, onGetSuggestions, isGenerating }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <div className="flex space-x-2">
          <button
            onClick={onAdd}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Experience
          </button>
          <button
            onClick={onGetSuggestions}
            disabled={isGenerating}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'AI Suggestions'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-gray-200 rounded-lg relative">
            {experiences.length > 1 && (
              <button
                onClick={() => onRemove(exp.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 
                    0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7-3h8a1 1 
                    0 011 1v2H5V5a1 1 0 011-1z" />
                </svg>
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => onChange(index, 'company', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => onChange(index, 'position', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => onChange(index, 'startDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => onChange(index, 'endDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Present"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => onChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
