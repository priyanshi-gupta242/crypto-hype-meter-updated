 Features Implemented
AI-Driven Sentiment Analysis
Uses Gemini API to analyze crypto sentiment.

 Dynamic Theme Changing
UI color changes (green/yellow/red) based on sentiment score.

Mock Price Data Generation
Generates realistic-looking crypto price data for visualization.

Crypto Selector
Allows switching between supported cryptocurrencies (like BTC, ETH).

 Real-Time Data Rendering
Updates sentiment and graph as crypto changes.

Custom React Hooks
Modular code for handling logic like useSentiment, usePriceData.

 APIs Used
Gemini (or OpenAI) API for AI sentiment analysis.
Mock data generator for fake crypto price trends (for testing/demo).
CoinGecko API for real prices

Setup Instructions
Clone the Repository:- 
git clone https://github.com/your-username/crypto-hype-meter.git
cd crypto-hype-meter
Install Dependencies :- npm install
create .env.local file :- touch .env.local
 Add This Inside:-VITE_GEMINI_API_KEY=your_actual_api_key_here

testing instructions:-npm run dev



