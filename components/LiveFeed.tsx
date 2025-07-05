import React from 'react';
import { SocialPost } from '../types';
import Card from './ui/Card';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface LiveFeedProps {
  posts: SocialPost[];
}

const LiveFeed: React.FC<LiveFeedProps> = ({ posts }) => {
  const { speak, cancel, isSpeaking, spokenText } = useTextToSpeech();

  const handleSpeakerClick = (text: string) => {
    if (isSpeaking && spokenText === text) {
      cancel();
    } else {
      speak(text);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-300 mb-4">Live Social Feed</h3>
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {posts.map((post, index) => {
          const isThisSpeaking = isSpeaking && spokenText === post.text;
          return(
            <div key={index} className="flex items-start space-x-3 bg-gray-900/50 p-3 rounded-lg">
              <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <p className="font-semibold text-[var(--color-accent-emphasis)]">{post.user}</p>
                <p className="text-gray-300">{post.text}</p>
              </div>
              <button 
                onClick={() => handleSpeakerClick(post.text)} 
                title={isThisSpeaking ? "Stop speaking" : "Read post aloud"} 
                className="text-gray-500 hover:text-[var(--color-accent-emphasis)] transition-colors flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isThisSpeaking ? 'text-[var(--color-accent-emphasis)] animate-pulse' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11.25 4.5l-4.5 4.5H3.75a1.5 1.5 0 00-1.5 1.5v4.5a1.5 1.5 0 001.5 1.5h3l4.5 4.5V4.5z" />
                </svg>
              </button>
            </div>
          )
        })}
      </div>
    </Card>
  );
};

export default LiveFeed;