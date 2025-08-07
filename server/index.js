import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { storage } from './storage.js';
import { messageValidation } from '../shared/schema.js';

const app = express();
const server = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client/dist'));

// define-ocg: Configuration object for optimal chat group server management
const varOcg = {
  port: process.env.PORT || 5000,
  host: '0.0.0.0',
  heartbeatInterval: 30000,
  maxConnections: 100,
};

// API Routes
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await storage.getRecentMessages(5);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    if (!messageValidation.validateMessage(req.body)) {
      return res.status(400).json({ error: 'Invalid message data' });
    }
    
    const message = await storage.addMessage(req.body);
    
    // Broadcast new message to all connected WebSocket clients
    broadcastToAll({
      type: 'message',
      data: message,
    });
    
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: 'Invalid message data' });
  }
});

// WebSocket server setup
const wss = new WebSocketServer({ server, path: '/ws' });
const connectedClients = new Set();

wss.on('connection', (ws) => {
  console.log('New WebSocket connection established');
  connectedClients.add(ws);

  // Send current messages to newly connected client
  storage.getRecentMessages(5).then(messages => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({
        type: 'initial_messages',
        data: messages,
      }));
    }
  });

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      
      if (!messageValidation.validateWSMessage(message)) {
        console.error('Invalid WebSocket message format');
        return;
      }
      
      // Broadcast message to all other connected clients
      broadcastToOthers(ws, message);
      
      // Handle typing events
      if (message.type === 'typing') {
        setTimeout(() => {
          if (ws.readyState === ws.OPEN) {
            broadcastToOthers(ws, {
              type: 'typing',
              data: { ...message.data, isTyping: false },
            });
          }
        }, 3000);
      }
    } catch (error) {
      console.error('Invalid WebSocket message:', error);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    connectedClients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    connectedClients.delete(ws);
  });

  // Heartbeat to keep connection alive
  const heartbeat = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.ping();
    } else {
      clearInterval(heartbeat);
    }
  }, varOcg.heartbeatInterval);
});

function broadcastToAll(message) {
  const messageStr = JSON.stringify(message);
  connectedClients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(messageStr);
    }
  });
}

function broadcastToOthers(sender, message) {
  const messageStr = JSON.stringify(message);
  connectedClients.forEach(client => {
    if (client !== sender && client.readyState === client.OPEN) {
      client.send(messageStr);
    }
  });
}

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile('client/dist/index.html', { root: '.' });
});

// Start server
server.listen(varOcg.port, varOcg.host, () => {
  console.log(`🚀 Server running on http://localhost:${varOcg.port}`);
  console.log(`📡 WebSocket server ready on ws://localhost:${varOcg.port}/ws`);
});