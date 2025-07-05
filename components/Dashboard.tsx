import React, { useState, useEffect } from 'react';
import { CombinedData, Crypto } from '../types';
import HypeChart from './HypeChart';
import SentimentGauge from './SentimentGauge';
import LiveFeed from './LiveFeed';
import AnomalyAlert from './AnomalyAlert';
import Card from './ui/Card';
import Spinner from './ui/Spinner';
import { CRYPTO_FUN_FACTS } from '../constants';

interface DashboardProps {
  data: CombinedData | null;
  crypto: Crypto;
  isLoading: boolean;
  error: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ data, crypto, isLoading, error }) => {
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    if (isLoading) {
      // Pick a new random fact when loading starts
      setFunFact(CRYPTO_FUN_FACTS[Math.floor(Math.random() * CRYPTO_FUN_FACTS.length)]);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <Spinner />
        <p className="text-xl font-semibold mt-4 text-gray-300">Analyzing Market Data...</p>
        <p className="text-gray-400 mt-2 max-w-md">
          <span className="font-bold text-gray-300">Did you know?</span> {funFact}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
         <Card className="text-center bg-red-900/50 border-red-500">
           <h2 className="text-xl font-bold text-red-300">An Error Occurred</h2>
           <p className="text-red-200 mt-2">{error}</p>
         </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="text-center">
          <h2 className="text-xl font-bold">No Data</h2>
          <p className="text-gray-400 mt-2">Select a cryptocurrency to begin analysis.</p>
        </Card>
      </div>
    );
  }
  
  const { priceData, hypeData, sentiment, socialFeed, anomaly } = data;

  return (
    <div className="flex-grow p-4 md:p-6 space-y-6">
      {anomaly.isAnomaly && (
        <div>
          <AnomalyAlert anomaly={anomaly} />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-200">Price vs. Social Hype for {crypto.name}</h2>
            <HypeChart priceData={priceData} hypeData={hypeData} />
          </Card>
        </div>

        <div className="lg:col-span-1">
          <SentimentGauge sentiment={sentiment} />
        </div>

        <div className="lg:col-span-2">
          <LiveFeed posts={socialFeed} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;