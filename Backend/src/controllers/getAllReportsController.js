const AnalysisReport = require('../models/anaylsis.model')

async function getAllReport(req, res) {
    try {
        const reports = await AnalysisReport.find({ userId: req.user.id });
        if (reports.length == 0) {
            return res.status(404).json({ message: "No report found" })
        }

        res.status(200).json({
            message: 'Reports fetched succesfully',
            report: reports
        })
    }
    catch (error) {
        console.error("Error loading reports:", error);
        res.status(500).json({ message: 'Server error' });
    }


}
async function getReportById(req, res) {
    try {
        const id = req.params.id;
        const reportById = await AnalysisReport.findById(id);
        if (!reportById) {
            return res.status(404).json({ message: "No report found" })
        }
        if (reportById.userId.toString() != req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        return res.status(200).json({
            message: 'Report fetched successfully',
            report: reportById
        })
    } catch (error) {
        console.error("Error loading report:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteReport(req, res) {
    try {
        const id = req.params.id;
        const reportById = await AnalysisReport.findById(id);
        if (!reportById) {
            return res.status(404).json({ message: "No report found" })
        }
        if (reportById.userId.toString() != req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const result = await AnalysisReport.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            return res.status(200).json({
                message: 'Report deleted successfully',
                report: reportById
            })
        }
    }
    catch (error) {
        console.error("Error deleting report:", error);
        res.status(500).json({ message: 'Server error' });
    }

}

module.exports={getAllReport,getReportById,deleteReport}