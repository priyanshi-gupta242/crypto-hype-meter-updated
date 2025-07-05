export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  description: string;
}

export interface PricePoint {
  timestamp: number;
  price: number;
  volume: number;
}

export interface HypePoint {
  timestamp: number;
  volume: number;
}

export interface Sentiment {
  score: number;
  summary: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface SocialPost {
  user: string;
  text: string;
  avatar: string;
}

export interface Anomaly {
  isAnomaly: boolean;
  reason: string;
}

export interface CombinedData {
  priceData: PricePoint[];
  hypeData: HypePoint[];
  sentiment: Sentiment;
  socialFeed: SocialPost[];
  anomaly: Anomaly;
}

// Type for the full JSON response expected from Gemini
export interface GeminiResponse {
  sentiment: Sentiment;
  hypeData: HypePoint[];
  socialFeed: SocialPost[];
  anomaly: Anomaly;
}
