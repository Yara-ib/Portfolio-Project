import app from './app/app.js';
import { createServer } from 'http';

const server = createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, (req, res) => {
  console.log(`Server listening on Port ${PORT}`);
});
