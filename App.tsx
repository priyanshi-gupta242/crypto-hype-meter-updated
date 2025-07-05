import React, { useState, useEffect, useCallback } from 'react';
import CryptoSelector from './components/CryptoSelector';
import Dashboard from './components/Dashboard';
import { CombinedData, Crypto } from './types';
import { SUPPORTED_CRYPTOS } from './constants';
import { fetchAiDrivenData } from './services/geminiService';
import { generateMockPriceData } from './services/cryptoService';

const setAccentTheme = (sentimentScore: number | null) => {
  const root = document.documentElement;
  if (sentimentScore === null) { // Default/loading state
    root.style.setProperty('--color-accent', '#3b82f6'); // blue-500
    root.style.setProperty('--color-accent-emphasis', '#60a5fa'); // blue-400
    return;
  }
  
  if (sentimentScore >= 70) { // Positive
    root.style.setProperty('--color-accent', '#22c55e'); // green-500
    root.style.setProperty('--color-accent-emphasis', '#4ade80'); // green-400
  } else if (sentimentScore >= 40) { // Neutral
    root.style.setProperty('--color-accent', '#eab308'); // yellow-500
    root.style.setProperty('--color-accent-emphasis', '#facc15'); // yellow-400
  } else { // Negative
    root.style.setProperty('--color-accent', '#ef4444'); // red-500
    root.style.setProperty('--color-accent-emphasis', '#f87171'); // red-400
  }
};


const App: React.FC = () => {
  const [selectedCryptoId, setSelectedCryptoId] = useState<string>(SUPPORTED_CRYPTOS[0].id);
  const [data, setData] = useState<CombinedData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const selectedCrypto = SUPPORTED_CRYPTOS.find(c => c.id === selectedCryptoId) || SUPPORTED_CRYPTOS[0];

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // In a real app, these would be parallel API calls
      const priceData = generateMockPriceData(selectedCrypto.id);
      const aiData = await fetchAiDrivenData(selectedCrypto);

      // Align AI hype data timestamps with price data timestamps
      const alignedHypeData = aiData.hypeData.map((hypePoint, index) => ({
          ...hypePoint,
          timestamp: priceData[index].timestamp
      }));
      
      setData({
        priceData,
        hypeData: alignedHypeData,
        sentiment: aiData.sentiment,
        socialFeed: aiData.socialFeed,
        anomaly: aiData.anomaly
      });
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCrypto]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Effect for dynamic theming
  useEffect(() => {
    if (isLoading || error || !data) {
        setAccentTheme(null); // Reset to default theme
    } else {
        setAccentTheme(data.sentiment.score);
    }
  }, [data, isLoading, error]);


  const handleCryptoChange = (cryptoId: string) => {
    setSelectedCryptoId(cryptoId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <svg className="h-8 w-8 text-[var(--color-accent-emphasis)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Crypto-Hype Meter</h1>
            </div>
            <div className="w-48 sm:w-64">
              <CryptoSelector 
                selectedCryptoId={selectedCryptoId} 
                onCryptoChange={handleCryptoChange}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        <Dashboard 
          data={data}
          crypto={selectedCrypto}
          isLoading={isLoading}
          error={error}
        />
      </main>

       <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Gemini AI. Data is for illustrative purposes only.</p>
      </footer>
    </div>
  );
};

export default App;