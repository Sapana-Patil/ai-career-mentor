const {Router} = require('express');
const analysisRoutes = Router();
const upload=require('../config/multer');
const { analyseResumeController } = require('../controllers/analysis.controller');
const {authUser}=require('../middleware/auth.middleware');
const {getAllReport,getReportById,deleteReport}=require('../controllers/getAllReportsController')


/** 
 * @route POST /api/analysis/analyze
 * @description Analyze a PDF file and return the analysis result
 * @access Private
 */
 
analysisRoutes.post('/analyze',authUser,upload.single('resume'),analyseResumeController);

analysisRoutes.get('/reports',authUser,getAllReport);
analysisRoutes.get('/reports/:id',authUser,getReportById);
analysisRoutes.delete('/reports/:id',authUser,deleteReport);



module.exports = analysisRoutes;