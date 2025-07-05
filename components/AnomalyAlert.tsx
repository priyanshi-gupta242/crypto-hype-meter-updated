import React from 'react';
import { Anomaly } from '../types';

interface AnomalyAlertProps {
  anomaly: Anomaly;
}

const AnomalyAlert: React.FC<AnomalyAlertProps> = ({ anomaly }) => {
  if (!anomaly.isAnomaly) {
    return null;
  }

  return (
    <div className="bg-red-900/50 border-2 border-red-500 text-red-200 px-4 py-3 rounded-lg relative" role="alert">
      <div className="flex items-center">
         <svg className="w-6 h-6 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        <div>
          <strong className="font-bold">Anomaly Detected! </strong>
          <span className="block sm:inline">{anomaly.reason}</span>
        </div>
      </div>
    </div>
  );
};

export default AnomalyAlert;
