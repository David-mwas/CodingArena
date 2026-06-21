import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());

// Health check endpoint for Render/Railway
app.get('/health', (req, res) => res.send('OK'));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// State grouped by roomCode
const rooms = {};

wss.on('connection', (ws, req) => {
  // Parse roomCode and name from URL query params
  // Format: ws://localhost:1999/?room=lobby&name=Player1
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomCode = url.searchParams.get('room') || 'lobby';
  const name = url.searchParams.get('name') || 'Anonymous';
  
  // Create room if it doesn't exist
  if (!rooms[roomCode]) {
    rooms[roomCode] = {
      players: {},
      challengeId: null,
      gamePhase: 'waiting'
    };
  }
  
  const room = rooms[roomCode];
  const socketId = uuidv4();
  ws.id = socketId;
  ws.roomCode = roomCode;

  // Add player to room
  room.players[socketId] = {
    id: socketId,
    name: name,
    ready: false,
    progress: 0,
    status: 'Connected',
    isHost: Object.keys(room.players).length === 0,
    hasGivenUp: false
  };

  // Send the assigned socketId to the client
  ws.send(JSON.stringify({ type: 'init', id: socketId }));

  const broadcastState = () => {
    const stateMsg = JSON.stringify({
      type: 'sync',
      state: room
    });
    wss.clients.forEach(client => {
      if (client.roomCode === roomCode && client.readyState === 1) {
        client.send(stateMsg);
      }
    });
  };

  const broadcast = (msgObj) => {
    const msgStr = JSON.stringify(msgObj);
    wss.clients.forEach(client => {
      if (client.roomCode === roomCode && client.readyState === 1) {
        client.send(msgStr);
      }
    });
  };

  broadcastState();

  ws.on('message', (messageString) => {
    let msg;
    try {
      msg = JSON.parse(messageString);
    } catch (err) {
      return;
    }

    if (msg.type === 'ready') {
      if (room.players[socketId]) {
        room.players[socketId].ready = true;
      }
      const activePlayers = Object.values(room.players).filter(p => !p.hasGivenUp);
      if (activePlayers.length >= 2 && activePlayers.every(p => p.ready)) {
        broadcast({ type: 'all_ready' });
      }
      broadcastState();
    }

    if (msg.type === 'start_study') {
      room.challengeId = msg.challengeId;
      room.gamePhase = 'study';
      broadcastState();
      broadcast({ type: 'study_started', challengeId: msg.challengeId });
    }

    if (msg.type === 'start_race') {
      room.gamePhase = 'playing';
      for (const pid in room.players) {
        room.players[pid].progress = 0;
        room.players[pid].status = 'Analyzing...';
      }
      broadcastState();
      broadcast({ type: 'race_started' });
    }

    if (msg.type === 'progress') {
      if (room.players[socketId]) {
        room.players[socketId].progress = msg.progress;
        room.players[socketId].status = msg.status;
      }
      broadcastState();
    }

    if (msg.type === 'win') {
      if (room.gamePhase !== 'finished') {
        room.gamePhase = 'finished';
        broadcastState();
        broadcast({ 
          type: 'game_over', 
          winnerId: socketId, 
          winnerName: room.players[socketId]?.name 
        });
      }
    }

    if (msg.type === 'give_up') {
      if (room.gamePhase !== 'finished') {
        room.gamePhase = 'finished';
        room.players[socketId].status = 'Given Up';
        room.players[socketId].hasGivenUp = true;
        broadcastState();
        
        const winnerId = Object.keys(room.players).find(id => id !== socketId) || 'nobody';
        broadcast({ 
          type: 'game_over', 
          winnerId: winnerId,
          winnerName: room.players[winnerId]?.name || 'Opponent'
        });
      }
    }
    
    if (msg.type === 'play_again') {
      room.gamePhase = 'waiting';
      for (const pid in room.players) {
        room.players[pid].ready = false;
        room.players[pid].progress = 0;
        room.players[pid].hasGivenUp = false;
      }
      broadcastState();
    }
  });

  ws.on('close', () => {
    if (room.players[socketId]) {
      delete room.players[socketId];
      const remaining = Object.values(room.players);
      if (remaining.length > 0 && !remaining.some(p => p.isHost)) {
        remaining[0].isHost = true;
      }
      broadcastState();
      
      // Cleanup empty rooms
      if (remaining.length === 0) {
        delete rooms[roomCode];
      }
    }
  });
});

const PORT = process.env.PORT || 1999;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
