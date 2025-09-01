const PDFDocument = require('pdfkit');

const generatePDF = (resumeData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];
      
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Add content to PDF
      doc.fontSize(20).text(resumeData.personal.name || 'Resume', 100, 100);
      doc.fontSize(12);
      
      // Contact information
      if (resumeData.personal.email || resumeData.personal.phone || resumeData.personal.location) {
        doc.text('Contact Information:', 100, 140);
        let contactY = 160;
        
        if (resumeData.personal.email) {
          doc.text(`Email: ${resumeData.personal.email}`, 100, contactY);
          contactY += 20;
        }
        
        if (resumeData.personal.phone) {
          doc.text(`Phone: ${resumeData.personal.phone}`, 100, contactY);
          contactY += 20;
        }
        
        if (resumeData.personal.location) {
          doc.text(`Location: ${resumeData.personal.location}`, 100, contactY);
          contactY += 20;
        }
        
        if (resumeData.personal.linkedin) {
          doc.text(`LinkedIn: ${resumeData.personal.linkedin}`, 100, contactY);
          contactY += 30;
        }
      }

      // Summary
      if (resumeData.personal.summary) {
        doc.text('Professional Summary:', 100, doc.y + 20);
        doc.text(resumeData.personal.summary, 100, doc.y + 10, {
          width: 400,
          align: 'left'
        });
      }

      // Work Experience
      if (resumeData.work && resumeData.work.length > 0) {
        doc.text('Work Experience:', 100, doc.y + 30);
        
        resumeData.work.forEach((job, index) => {
          if (job.company || job.position) {
            doc.text(`${job.position} at ${job.company}`, 100, doc.y + 10);
            
            if (job.startDate || job.endDate) {
              const dates = `${job.startDate || ''} - ${job.endDate || 'Present'}`;
              doc.text(dates, 400, doc.y - 15, { align: 'right' });
            }
            
            if (job.description) {
              doc.text(job.description, 100, doc.y + 5, {
                width: 400,
                align: 'left'
              });
            }
            
            doc.moveDown();
          }
        });
      }

      // Education
      if (resumeData.education && resumeData.education.length > 0) {
        doc.text('Education:', 100, doc.y + 20);
        
        resumeData.education.forEach((edu, index) => {
          if (edu.institution || edu.degree) {
            doc.text(`${edu.degree} in ${edu.field}`, 100, doc.y + 10);
            doc.text(edu.institution, 100, doc.y + 5);
            
            if (edu.startDate || edu.endDate) {
              const dates = `${edu.startDate || ''} - ${edu.endDate || 'Present'}`;
              doc.text(dates, 400, doc.y - 15, { align: 'right' });
            }
            
            doc.moveDown();
          }
        });
      }

      // Skills
      if (resumeData.skills && resumeData.skills.length > 0) {
        doc.text('Skills:', 100, doc.y + 20);
        doc.text(resumeData.skills.join(', '), 100, doc.y + 10, {
          width: 400,
          align: 'left'
        });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generatePDF };