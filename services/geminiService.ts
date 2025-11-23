import { GoogleGenAI, Type } from "@google/genai";
import { MBTIResult, AIAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePersonalityAnalysis = async (result: MBTIResult): Promise<AIAnalysis> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    The user has taken an MBTI test and their result is ${result.type}.
    Their score breakdown is:
    Extraversion: ${result.scores.E}, Introversion: ${result.scores.I}
    Sensing: ${result.scores.S}, Intuition: ${result.scores.N}
    Thinking: ${result.scores.T}, Feeling: ${result.scores.F}
    Judging: ${result.scores.J}, Perceiving: ${result.scores.P}

    Generate a creative, insightful, and slightly mystical personality profile for this user.
    The tone should be professional yet engaging and warm.
    The 'spiritAnimal' should be a metaphor that fits their personality type well.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy title for this personality type (e.g. The Architect, The Visionary)" },
            summary: { type: Type.STRING, description: "A 2-3 sentence summary of their essence." },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 key strengths"
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 potential blind spots"
            },
            careerPath: { type: Type.STRING, description: "A brief career suggestion or work style description." },
            spiritAnimal: { type: Type.STRING, description: "A symbolic animal representing their nature." }
          },
          required: ["title", "summary", "strengths", "weaknesses", "careerPath", "spiritAnimal"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AIAnalysis;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data in case of API failure or missing key
    return {
      title: `${result.type} - The Thinker`,
      summary: "You have a complex inner world and a drive to understand the systems around you. While we couldn't reach the AI oracle for a custom reading, your type suggests you are analytical and thoughtful.",
      strengths: ["Analytical", "Strategic", "Independent"],
      weaknesses: ["Overthinking", "Perfectionism", "Isolated"],
      careerPath: "Strategic Planning, Engineering, or Research",
      spiritAnimal: "Owl"
    };
  }
};