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

    Generate a creative, insightful, and slightly mystical personality profile for this user in Korean (Hangul).
    The tone should be professional yet engaging and warm.
    The 'spiritAnimal' should be a metaphor that fits their personality type well.
    Please ensure all text fields in the JSON response are in Korean.
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
            title: { type: Type.STRING, description: "A catchy title for this personality type in Korean (e.g. 전략가, 통찰력 있는 예언자)" },
            summary: { type: Type.STRING, description: "A 2-3 sentence summary of their essence in Korean." },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 key strengths in Korean"
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 potential blind spots in Korean"
            },
            careerPath: { type: Type.STRING, description: "A brief career suggestion or work style description in Korean." },
            spiritAnimal: { type: Type.STRING, description: "A symbolic animal representing their nature in Korean." }
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
      title: `${result.type} - 사색하는 분석가`,
      summary: "당신은 복잡한 내면 세계를 가지고 있으며 주변의 시스템을 이해하려는 열망이 있습니다. AI 오라클과의 연결이 지연되었지만, 당신의 유형은 분석적이고 사려 깊은 성향을 나타냅니다.",
      strengths: ["분석적 사고", "전략적 계획", "독립성"],
      weaknesses: ["지나친 생각", "완벽주의", "고립감"],
      careerPath: "전략 기획, 엔지니어링, 연구직 또는 학술 분야",
      spiritAnimal: "부엉이"
    };
  }
};