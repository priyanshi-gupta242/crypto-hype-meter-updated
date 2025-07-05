import React from 'react';
import { Crypto } from '../types';
import { SUPPORTED_CRYPTOS } from '../constants';

interface CryptoSelectorProps {
  selectedCryptoId: string;
  onCryptoChange: (cryptoId: string) => void;
  isLoading: boolean;
}

const CryptoSelector: React.FC<CryptoSelectorProps> = ({ selectedCryptoId, onCryptoChange, isLoading }) => {
  return (
    <div className="relative">
      <select
        id="crypto-select"
        value={selectedCryptoId}
        onChange={(e) => onCryptoChange(e.target.value)}
        disabled={isLoading}
        className="block w-full px-4 py-3 text-base text-white bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {SUPPORTED_CRYPTOS.map((crypto) => (
          <option key={crypto.id} value={crypto.id}>
            {crypto.name} ({crypto.symbol})
          </option>
        ))}
      </select>
       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
       </div>
    </div>
  );
};

export default CryptoSelector;