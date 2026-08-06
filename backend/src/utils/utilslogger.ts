import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.join(__dirname, '../../logs');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export function logEvent(message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message} ${data ? JSON.stringify(data) : ''}\n`;
  
  console.log(logEntry);
  fs.appendFileSync(path.join(LOG_DIR, 'drain.log'), logEntry);
}

export function logError(error: Error, context?: string): void {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ERROR: ${context || 'Unknown context'} - ${error.message}\n${error.stack}\n`;
  
  console.error(logEntry);
  fs.appendFileSync(path.join(LOG_DIR, 'error.log'), logEntry);
}