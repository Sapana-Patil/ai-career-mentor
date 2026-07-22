const ai = require('../config/gemini');
const { z } = require('zod');

const resumeJsonSchema = z.object({
    matchScore: z.number()
        .min(0)
        .max(100)
        .describe('An overall match score (0-100) representing how well the candidate\'s resume aligns with the job description, based on skills, experience level, and requirements coverage'),

    technicalQuestions: z.array(z.object({
        question: z.string().describe('The technical question asked in the interview'),
        intention: z.string().describe('The intention behind asking this question'),
        answer: z.string().describe('How to answer this question, what points to cover, what approach to take, what to avoid')
    })).describe('A list of technical interview questions tailored to the candidate\'s resume'),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe('The behavioral question asked in the interview'),
        intention: z.string().describe('The intention behind asking this question'),
        answer: z.string().describe('How to answer this question, what points to cover, what approach to take, what to avoid')
    })).describe('A list of behavioral interview questions tailored to the candidate\'s resume'),

    skillGaps: z.array(z.object({
        skill: z.string().describe('The skill that is missing or weak based on the resume'),
        importance: z.enum(['High', 'Medium', 'Low']).describe('How critical this skill gap is')
    })).describe('A list of skill gaps identified from comparing the resume against the target role'),

    roadmap: z.array(z.object({
        week: z.number().describe('The week number in the learning roadmap'),
        topics: z.array(z.string()).describe('Topics to cover in this week'),
        tasks: z.array(z.string()).describe('Actionable tasks to complete this week'),
        resources: z.array(z.string()).describe('Learning resources for this week')
    })).describe('A week-by-week learning roadmap to close the identified skill gaps')
});

async function generateReport(resumeText, selfDescription, jobDescription) {
const resumeSchema = z.fromJSONSchema(resumeJsonSchema);
    

    const prompt = `You are a senior technical interviewer and career coach who has conducted hundreds of interviews for the role described below. You are preparing a candidate for their upcoming interview.
    Resume:${resumeText}
    Candidate's self-description:${selfDescription}
    Target job description:${jobDescription}
    ## Your Task
Analyze the resume against the job description and generate a personalized 
interview preparation report. Ground every question and answer in specifics 
from the resume and job description — avoid generic interview questions that 
could apply to anyone.

1. **Match Score**: Give a score from 0-100 representing how well this 
   candidate's resume matches the job description overall. Base it on 
   skills coverage, years/level of experience, domain relevance, and any 
   must-have requirements from the job description. A score above 85 
   should mean very few gaps; below 50 should mean the candidate is missing 
   multiple core requirements. Be honest and realistic — do not default to 
   a "safe" middle score.

2. **Technical Questions**: Generate 5 questions a real interviewer would 
   ask based on the specific technologies, projects, and claims in this 
   resume, cross-referenced against what the job actually requires. 
   Prioritize areas where the resume shows moderate depth (interviewers 
   probe these hardest) over areas that are either very strong or absent.
   For each question, explain the interviewer's likely intention (are they 
   testing depth, verifying a claim, checking problem-solving process?) and 
   give a concrete answer strategy — not just "be confident," but specific 
   points to hit, a suggested structure (e.g. STAR, or trade-off framing), 
   and common mistakes to avoid for that specific question.

3. **Behavioral Questions**: Generate 4 questions based on gaps, 
   transitions, or notable patterns in the resume (job changes, career 
   pivots, leadership claims, team size, etc.) as well as standard 
   behavioral areas relevant to this role's seniority level. Same depth 
   of answer guidance as above.

4. **Skill Gaps**: Compare the resume directly against the job description's 
   requirements. Only list gaps that are actually implied by a mismatch 
   between the two documents — do not invent generic gaps. Rate each by 
   importance based on how central that skill is to the job description. 
   These gaps should be consistent with the match score you gave above.

5. **Roadmap**: Build a realistic week-by-week plan (aim for 4-6 weeks) 
to close the identified skill gaps before the interview. 

IMPORTANT: The roadmap must be directly tied to THIS candidate's specific 
skill gaps identified above. Do NOT generate a generic learning plan.

For example:
- If the candidate knows React but lacks testing → focus roadmap on 
  Jest/Supertest specifically for React/Node apps
- If the candidate has ML experience but lacks Docker → start roadmap 
  with Dockerizing a Python ML app, not a generic Docker tutorial

Each week must:
- Reference specific technologies FROM the candidate's resume
- Build on what the candidate ALREADY knows
- Include tasks that involve MODIFYING or EXTENDING their existing projects
- Name specific resources relevant to their exact stack

Example of BAD task: "Learn Docker"
Example of GOOD task: "Dockerize your existing Loan Default Prediction 
Streamlit app and push the image to Docker Hub"
`;


const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash",
  input: prompt,
  response_format: {
    type: 'text',
    mime_type: 'application/json',
    schema: resumeJsonSchema.toJSONSchema()
  },
});

const resume = resumeSchema.parse(JSON.parse(interaction.output_text));
return resume;
}



module.exports = { generateReport };