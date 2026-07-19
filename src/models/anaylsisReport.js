const mongoose = require('mongoose');

const analysisReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobDescription: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [{
        question: { type: String },
        answer: { type: String },
        intention: { type: String },
    }],

    behavioralQuestions: [{
        question: { type: String },
        answer: { type: String },
        intention: { type: String },
    }],
    skillGaps: [{
        skill: { type: String },
        importance: {
            type: String,
            required: true,
            enum: ['High', 'Medium', 'Low'],
        },
    }],
    roadmap: [{
        week: { type: Number,required: true },
        topics: [{ type: String ,required: true}],
        tasks: [{ type: String ,required: true}],
        resources: [{ type: String ,required: true}],
    }],

}, { timestamps: true });

const AnalysisReport = mongoose.model('AnalysisReport', analysisReportSchema);

module.exports = AnalysisReport;
