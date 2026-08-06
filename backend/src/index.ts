import dotenv from 'dotenv';
dotenv.config();

import app from './api/server';
import { logEvent } from './utils/logger';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logEvent(`🚀 Drainer API running on port ${PORT}`);
  logEvent(`📍 Endpoint: http://localhost:${PORT}/api/drain`);
  logEvent(`📊 Stats: http://localhost:${PORT}/api/admin/stats`);
});