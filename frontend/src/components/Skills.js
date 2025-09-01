import React from 'react';

const Skills = ({ skills, newSkill, onChange, onAdd, onRemove, onGetSuggestions, isGenerating }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
        <button
          onClick={onGetSuggestions}
          disabled={isGenerating}
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center transition-colors disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'AI Suggestions'}
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Add Skills</label>
        <div className="flex">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => onChange(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter a skill"
            onKeyPress={(e) => e.key === 'Enter' && onAdd()}
          />
          <button
            onClick={onAdd}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-r-lg transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Your Skills</h3>
        {skills.length === 0 ? (
          <p className="text-gray-500 text-sm">No skills added yet. Start adding skills above.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-full px-3 py-1 flex items-center">
                <span className="text-sm">{skill}</span>
                <button
                  onClick={() => onRemove(index)}
                  className="ml-1 text-gray-400 hover:text-red-500"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;