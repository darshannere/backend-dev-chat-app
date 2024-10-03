const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'join') {
            // New user joins
            clients.set(ws, parsedMessage.username);
            broadcast(`${parsedMessage.username} has joined the chat`);
            broadcastConnectedUsers();
        } else if (parsedMessage.type === 'message') {
            // Broadcast the message
            broadcast(`${clients.get(ws)}: ${parsedMessage.content}`);
            // broadcastConnectedUsers();
        }
    });

    ws.on('close', () => {
        const username = clients.get(ws);
        clients.delete(ws);
        broadcast(`${username} has left the chat`);
        broadcastConnectedUsers();
    });
});

function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message }));
        }
    });
}
function broadcastConnectedUsers() {
    const connectedUsers = Array.from(clients.values());
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'connected-users', connectedUsers }));
      }
    });
  }

// API endpoint to get connected users
app.get('/api/connected-users', (req, res) => {
    const connectedUsers = Array.from(clients.values());
    res.json({ connectedUsers });
});

app.use(express.static('client/build'));

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
