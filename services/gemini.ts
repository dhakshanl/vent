
import { GoogleGenAI, Type } from "@google/genai";
import { LearningPath } from "../types";

const SYSTEM_INSTRUCTION = `
You are an AI learning companion designed specifically to help students START learning a new technical skill.
Your primary goal is to reduce overwhelm and decision paralysis by suggesting only the most effective and engaging starting point for any topic.

Rules:
1. Do NOT provide long theoretical explanations upfront.
2. Suggest at most 1 highly efficient starter approach.
3. Prefer hands-on, fun, project-based activities over theory.
4. When code is useful, provide minimal but complete runnable code.
5. Always explain exactly where the code goes, how to run it, and what the learner can experiment with.
6. Avoid motivational filler like "don't worry" or "it's okay".
7. Speak clearly, practically, and confidently.
8. Optimize for curiosity, quick wins, and experimentation.
9. Assume the learner is confused but capable.
10. Do NOT overwhelm with options.

You MUST respond in JSON format matching this schema:
{
  "starterActivity": "Description of what to build and why",
  "executionPlan": ["Step 1", "Step 2", "..."],
  "code": "Optional minimal runnable code block",
  "howToRun": "Exact instructions on where to put code and how to execute",
  "nextSteps": "What to experiment with next"
}
`;

export const getLearningPath = async (skill: string): Promise<LearningPath> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `I want to learn: ${skill}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          starterActivity: { type: Type.STRING },
          executionPlan: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          code: { type: Type.STRING },
          howToRun: { type: Type.STRING },
          nextSteps: { type: Type.STRING }
        },
        required: ["starterActivity", "executionPlan", "howToRun", "nextSteps"]
      }
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text) as LearningPath;
};
