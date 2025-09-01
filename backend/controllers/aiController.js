const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Get AI suggestions
exports.getSuggestions = async (req, res) => {
  try {
    const { section, data } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'OpenAI API key not configured'
      });
    }
    
    let prompt = '';
    
    switch (section) {
      case 'personal':
        prompt = `As a professional resume consultant, provide constructive suggestions to improve this personal information for a resume: ${JSON.stringify(data)}. Focus on professional presentation, contact information best practices, and summary optimization. Provide specific, actionable advice.`;
        break;
      case 'work':
        prompt = `As a professional resume consultant, provide constructive suggestions to improve these work experience entries: ${JSON.stringify(data)}. Focus on using action verbs, quantifying achievements, proper formatting, and highlighting relevant skills. Provide specific examples of how to improve each entry.`;
        break;
      case 'education':
        prompt = `As a professional resume consultant, provide constructive suggestions to improve these education entries: ${JSON.stringify(data)}. Focus on proper formatting, relevant details to include, and how to present educational background effectively.`;
        break;
      case 'skills':
        prompt = `As a professional resume consultant, provide constructive suggestions to improve these skills: ${JSON.stringify(data)}. Focus on industry-relevant keywords, proper categorization, and how to best present skills for different job types. Suggest additional skills that might be relevant.`;
        break;
      default:
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid section' 
        });
    }
    
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional resume consultant providing helpful, specific, and actionable suggestions to improve resumes. Always provide constructive feedback with clear examples."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 600,
      temperature: 0.7,
    });
    
    const suggestions = response.data.choices[0].message.content;
    
    res.json({ 
      success: true, 
      suggestions 
    });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    
    // Fallback suggestions if OpenAI API fails
    const fallbackSuggestions = {
      personal: "Consider adding a professional email, LinkedIn profile, and a concise summary highlighting your key strengths and career objectives.",
      work: "Use action verbs like 'developed', 'managed', 'implemented'. Quantify achievements with numbers and percentages where possible.",
      education: "Include relevant coursework, projects, or academic achievements. Mention your GPA if it's above 3.0.",
      skills: "Group skills into categories (Technical, Soft Skills, etc.). Include industry-specific keywords from job descriptions you're targeting."
    };
    
    res.json({ 
      success: true, 
      suggestions: fallbackSuggestions[section] || "Suggestions could not be generated at this time. Please try again later.",
      isFallback: true
    });
  }
};