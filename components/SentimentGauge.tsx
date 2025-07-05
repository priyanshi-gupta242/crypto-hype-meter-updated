import React from 'react';
import { Sentiment } from '../types';
import Card from './ui/Card';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface SentimentGaugeProps {
  sentiment: Sentiment;
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({ sentiment }) => {
  const { score, summary, positive, neutral, negative } = sentiment;
  const circumference = 2 * Math.PI * 52; // 2 * pi * radius
  const offset = circumference - (score / 100) * circumference;
  const { speak, cancel, isSpeaking, spokenText } = useTextToSpeech();
  
  const summaryText = `Current sentiment score is ${score} out of 100. The overall summary is: ${summary}`;
  const isThisSpeaking = isSpeaking && spokenText === summaryText;

  const handleSpeakerClick = () => {
    if (isThisSpeaking) {
      cancel();
    } else {
      speak(summaryText);
    }
  };


  const getScoreColor = (s: number) => {
    if (s >= 70) return 'text-green-400';
    if (s >= 40) return 'text-yellow-400';
    return 'text-red-500';
  };

  const getStrokeColor = (s: number) => {
    if (s >= 70) return 'stroke-green-400';
    if (s >= 40) return 'stroke-yellow-400';
    return 'stroke-red-500';
  }

  return (
    <Card className="flex flex-col items-center justify-center h-full">
      <h3 className="text-lg font-bold text-gray-300 mb-4">Sentiment Analysis</h3>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="stroke-gray-700"
            strokeWidth="10"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
          <circle
            className={`transform -rotate-90 origin-center transition-all duration-500 ${getStrokeColor(score)}`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
          <span className="text-sm text-gray-400">/ 100</span>
        </div>
      </div>
       <div className="mt-4 text-center text-gray-400 italic flex items-center gap-2">
        <p>"{summary}"</p>
        <button 
          onClick={handleSpeakerClick} 
          title={isThisSpeaking ? "Stop speaking" : "Read summary aloud"} 
          className="text-gray-500 hover:text-[var(--color-accent-emphasis)] transition-colors flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isThisSpeaking ? 'text-[var(--color-accent-emphasis)] animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11.25 4.5l-4.5 4.5H3.75a1.5 1.5 0 00-1.5 1.5v4.5a1.5 1.5 0 001.5 1.5h3l4.5 4.5V4.5z" />
          </svg>
        </button>
      </div>
      <div className="w-full mt-4 flex justify-between text-sm">
         <span className="text-green-400">😀 {positive}%</span>
         <span className="text-yellow-400">😐 {neutral}%</span>
         <span className="text-red-500">😡 {negative}%</span>
      </div>
    </Card>
  );
};

export default SentimentGauge;