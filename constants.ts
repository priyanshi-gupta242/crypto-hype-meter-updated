import { Crypto } from './types';

export const SUPPORTED_CRYPTOS: Crypto[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    description: 'a decentralized digital currency, without a central bank or single administrator.'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    description: 'a decentralized, open-source blockchain with smart contract functionality.'
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    description: 'a cryptocurrency created as a joke, featuring the face of the Shiba Inu dog from the "Doge" meme.'
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    description: 'a decentralized cryptocurrency created as an "experiment in decentralized spontaneous community building".'
  },
];

export const CRYPTO_FUN_FACTS: string[] = [
  "Bitcoin's whitepaper was published under the pseudonym Satoshi Nakamoto, whose true identity is still a mystery.",
  "The first real-world transaction using Bitcoin was for two pizzas, costing 10,000 BTC in 2010.",
  "Ethereum introduced the concept of 'smart contracts', which are self-executing contracts with the terms of the agreement directly written into code.",
  "Dogecoin was created in 2013 as a joke, combining the Bitcoin protocol with the popular 'Doge' meme.",
  "There's a physical Bitcoin wallet in orbit on the International Space Station.",
  "Shiba Inu token is known as the 'Dogecoin Killer' and has built a large community called the 'ShibArmy'.",
  "Over 20,000 different cryptocurrencies exist, though most have very little trading volume or recognition.",
  "The term 'HODL' originated from a typo in a 2013 Bitcoin forum post and now means holding onto cryptocurrency rather than selling it."
];
