const {Router} = require('express');
const analysisRoutes = Router();
const upload=require('../config/multer');
const { analyseResumeController } = require('../controllers/analysis.controller');
const {authUser}=require('../middleware/auth.middleware');


/** 
 * @route POST /api/analysis/analyze
 * @description Analyze a PDF file and return the analysis result
 * @access Private
 */
 
analysisRoutes.post('/analyze',authUser,upload.single('resume'),analyseResumeController);

module.exports = analysisRoutes;