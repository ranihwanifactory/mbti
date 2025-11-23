import { GoogleGenAI, Type, Schema } from "@google/genai";
import { KeywordMetric, KeywordAnalysisResult, TrendDirection } from '../types';

// Use process.env.API_KEY directly as per instructions. 
// We handle the case where it might be missing inside the functions to prevent app crash.
const apiKey = process.env.API_KEY;

// Mock data generator for robust fallback
const generateMockTrendingData = (): KeywordMetric[] => {
  const keywords = [
    "치지직", "아이폰16", "날씨", "삼성전자", "환율", 
    "로또당첨번호", "비트코인", "손흥민", "넷플릭스", "유튜브"
  ];
  
  return keywords.map((k, i) => {
    const rank = i + 1;
    // Simulate some movement
    const prevRank = rank + Math.floor(Math.random() * 5) - 2; 
    const change = prevRank - rank;
    let trend = TrendDirection.STABLE;
    if (change > 0) trend = TrendDirection.UP;
    if (change < 0) trend = TrendDirection.DOWN;
    
    return {
      keyword: k,
      rank,
      previousRank: prevRank > 0 ? prevRank : rank + 1,
      searchVolume: Math.floor(Math.random() * 500000) + 50000,
      competition: Math.random() > 0.6 ? 'High' : (Math.random() > 0.3 ? 'Medium' : 'Low'),
      trend,
      change: Math.abs(change)
    };
  });
};

export const fetchTrendingKeywords = async (): Promise<KeywordMetric[]> => {
  if (!apiKey) {
    console.warn("API Key missing, using mock data");
    return new Promise(resolve => setTimeout(() => resolve(generateMockTrendingData()), 800));
  }

  const ai = new GoogleGenAI({ apiKey });
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        keyword: { type: Type.STRING },
        rank: { type: Type.INTEGER },
        previousRank: { type: Type.INTEGER },
        searchVolume: { type: Type.INTEGER },
        competition: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
      },
      required: ['keyword', 'rank', 'previousRank', 'searchVolume', 'competition']
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a list of 10 currently trending keywords in South Korea for a dashboard. Include realistic ranks and search volumes.",
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a real-time SEO data engine for Naver. Provide realistic, high-entropy data.",
      }
    });

    const rawData = JSON.parse(response.text || '[]');
    
    return rawData.map((item: any) => {
        const change = item.previousRank - item.rank;
        let trend = TrendDirection.STABLE;
        if (change > 0) trend = TrendDirection.UP;
        if (change < 0) trend = TrendDirection.DOWN;

        return {
            ...item,
            trend,
            change: Math.abs(change)
        };
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return generateMockTrendingData();
  }
};

export const analyzeSpecificKeyword = async (keyword: string): Promise<KeywordAnalysisResult> => {
  if (!apiKey) {
      // Mock Analysis Data
      return new Promise(resolve => setTimeout(() => resolve({
          keyword,
          difficultyScore: Math.floor(Math.random() * 40) + 40,
          potentialScore: Math.floor(Math.random() * 50) + 40,
          relatedKeywords: [`${keyword} 추천`, `${keyword} 가격`, `요즘 ${keyword}`, `${keyword} 순위`, "인기순위"],
          seasonalTrend: [
              { month: '1월', volume: 4000 }, { month: '2월', volume: 3500 },
              { month: '3월', volume: 6000 }, { month: '4월', volume: 8200 },
              { month: '5월', volume: 7500 }, { month: '6월', volume: 9000 }
          ],
          summary: `현재 '${keyword}' 키워드는 상승 추세에 있으며, 특히 30대 남성 층의 검색 유입이 활발합니다. 콘텐츠 발행 시 '가성비'와 '최신 트렌드'를 강조하는 것이 상위 노출에 유리할 것으로 분석됩니다. 경쟁 강도는 높으나 틈새 키워드 공략이 가능합니다.`
      }), 1500));
  }

  const ai = new GoogleGenAI({ apiKey });
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      difficultyScore: { type: Type.INTEGER },
      potentialScore: { type: Type.INTEGER },
      relatedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
      seasonalTrend: {
          type: Type.ARRAY,
          items: {
              type: Type.OBJECT,
              properties: {
                  month: { type: Type.STRING },
                  volume: { type: Type.INTEGER }
              }
          }
      },
      summary: { type: Type.STRING }
    },
    required: ["difficultyScore", "potentialScore", "relatedKeywords", "seasonalTrend", "summary"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the keyword '${keyword}' for Naver SEO.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a top-tier SEO analyst for the Korean market. Provide strategic, actionable insights.",
      }
    });

    const result = JSON.parse(response.text || '{}');
    return { ...result, keyword };
  } catch (error) {
    console.error("Analysis Error:", error);
    throw new Error("Failed to analyze keyword");
  }
};