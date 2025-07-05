import { PricePoint } from '../types';
import { SUPPORTED_CRYPTOS } from '../constants';

// Generates a somewhat realistic, fluctuating time series data for crypto prices.
export const generateMockPriceData = (cryptoId: string): PricePoint[] => {
  const data: PricePoint[] = [];
  const now = new Date();
  const days = 7;
  const crypto = SUPPORTED_CRYPTOS.find(c => c.id === cryptoId);
  const basePrice = crypto?.id === 'bitcoin' ? 60000 : crypto?.id === 'ethereum' ? 3500 : crypto?.id === 'dogecoin' ? 0.15 : 0.000025;

  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now).setDate(now.getDate() - i);
    
    // Inject a hype spike for specific cryptos
    let priceMultiplier = 1;
    if ((cryptoId === 'dogecoin' || cryptoId === 'shiba-inu') && (i === 2 || i === 3)) {
        priceMultiplier = 1.8 + Math.random() * 0.4; // Sharp increase
    } else if ((cryptoId === 'dogecoin' || cryptoId === 'shiba-inu') && i === 1) {
        priceMultiplier = 0.6; // Correction after spike
    }

    const fluctuation = (Math.random() - 0.45) * 0.1; // General daily fluctuation
    currentPrice = currentPrice * (1 + fluctuation) * priceMultiplier;
    currentPrice = Math.max(currentPrice, basePrice * 0.5); // Prevent price from going too low

    const volume = Math.random() * 1000000000 + 500000000;

    data.push({
      timestamp: timestamp,
      price: parseFloat(currentPrice.toFixed(cryptoId === 'shiba-inu' ? 8 : 4)),
      volume: volume,
    });
  }
  return data;
};
