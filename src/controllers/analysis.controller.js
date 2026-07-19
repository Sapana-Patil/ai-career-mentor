const pdfParse=require('pdf-parse');

async function analyseResumeController(req, res) {
    try{
        const file=req.file;
        if(!file){
            return res.status(400).json({message:'No file uploaded'});
        }

        const pdfData = await pdfParse(file.buffer);
        const resumeText = pdfData.text;
        console.log( resumeText);
        res.status(400).json({message:'Resume analyzed successfully', resumeText});
    }
    catch (error) {
        console.error("Error analyzing resume:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { analyseResumeController };