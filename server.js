import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = 3000;

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Games Hub Server is running' });
  });

  // Serve static files from root
  app.use(express.static(__dirname));

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});
