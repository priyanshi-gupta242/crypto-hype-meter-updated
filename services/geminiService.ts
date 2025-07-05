import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Crypto, GeminiResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (crypto: Crypto): string => {
  let specialInstructions = `For "${crypto.name}", which is known for its ${crypto.description}, generate a plausible market scenario.`;

  if (crypto.id === 'dogecoin' || crypto.id === 'shiba-inu') {
    specialInstructions += ` Crucially, create a significant hype spike in the social media volume around 2-3 days ago, followed by a cooling-off period. This should be reflected in the hypeData and the socialFeed content. Mark this as an anomaly.`;
  } else {
    specialInstructions += ` The data should reflect a relatively stable market with standard fluctuations. Do not create any major anomalies.`;
  }

  return `
    You are a crypto market analyst AI. Your task is to generate a comprehensive JSON object for the cryptocurrency "${crypto.name} (${crypto.symbol})".
    The data must cover a 7-day period ending today.
    ${specialInstructions}

    The JSON object must strictly adhere to the following structure:
    {
      "sentiment": {
        "score": <a number between 0 and 100 (e.g., 78)>,
        "summary": "<A one-sentence summary of the current market sentiment>",
        "positive": <percentage number, e.g., 65>,
        "neutral": <percentage number, e.g., 25>,
        "negative": <percentage number, e.g., 10>
      },
      "hypeData": [
        // Array of exactly 8 data points for the last 7 days plus today.
        // Hype volume is a number from 0 to 1000.
        // Timestamps MUST be in milliseconds since epoch and correspond to each of the last 8 days.
        { "timestamp": <timestamp_day_7_ago>, "volume": <volume> },
        { "timestamp": <timestamp_day_6_ago>, "volume": <volume> },
        { "timestamp": <timestamp_day_5_ago>, "volume": <volume> },
        { "timestamp": <timestamp_day_4_ago>, "volume": <volume> },
        { "timestamp": <timestamp_day_3_ago>, "volume": <volume> },
        { "timestamp": <timestamp_day_2_ago>, "volume": <volume> },
        { "timestamp": <timestamp_day_1_ago>, "volume": <volume> },
        { "timestamp": <timestamp_today>, "volume": <volume> }
      ],
      "socialFeed": [
        // Array of 3 realistic, recent-style social media posts.
        { "user": "@User1", "avatar": "https://picsum.photos/seed/user1/40/40", "text": "<A realistic positive, neutral or negative tweet about ${crypto.symbol}>" },
        { "user": "@User2", "avatar": "https://picsum.photos/seed/user2/40/40", "text": "<Another realistic tweet>" },
        { "user": "@User3", "avatar": "https://picsum.photos/seed/user3/40/40", "text": "<A third realistic tweet>" }
      ],
      "anomaly": {
        "isAnomaly": <true or false based on special instructions>,
        "reason": "<If isAnomaly is true, a brief explanation, e.g., 'Massive 750% spike in social volume uncorrelated with significant news.'>"
      }
    }
  `;
};

export const fetchAiDrivenData = async (crypto: Crypto): Promise<GeminiResponse> => {
  const prompt = generatePrompt(crypto);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.8,
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData: GeminiResponse = JSON.parse(jsonStr);

    // Data validation and correction
    if (!parsedData.hypeData || parsedData.hypeData.length !== 8) {
      throw new Error("Invalid hypeData format received from AI.");
    }

    // Align timestamps from AI with real-world timestamps for charting
    const now = new Date();
    parsedData.hypeData = parsedData.hypeData.map((point, index) => ({
      ...point,
      timestamp: new Date(now).setDate(now.getDate() - (7 - index))
    }));

    return parsedData;

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to retrieve AI-driven market analysis. Please try again.");
  }
};
