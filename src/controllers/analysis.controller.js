const pdfParse = require('pdf-parse');
const { generateReport } = require('../services/ai-service')
const AnalysisReport = require('../models/anaylsis.model')

async function analyseResumeController(req, res) {
    try {
        const file = req.file;
        const { jobDescription, selfDescription } = req.body;
        if (!file && !selfDescription) {
            return res.status(400).json({ message: 'Please provide resume or self description' });
        }
        if (!jobDescription) {
            return res.status(400).json({ message: 'Job description is required' });
        }
        let resumeText = '';
        if (file) {
            const pdfData = await pdfParse(file.buffer);
            resumeText = pdfData.text;
        }
        const report = await generateReport(resumeText, selfDescription, jobDescription)

        const saveReport = await AnalysisReport.create({
            userId: req.user.id,
            jobDescription,
            resume: resumeText,
            selfDescription,
            ...report
        })
        res.status(201).json({
            message: 'Report generated succesfully',
            report: saveReport
        })
    }
    catch (error) {
        console.error("Error analyzing resume:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { analyseResumeController };