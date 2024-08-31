import { geckos, iceServers } from '@geckos.io/server';
import http from 'http';
import getEnvValue from './utils/environment.mjs';
import express from 'express';

const app = express()
const server = http.createServer(app);
const io = geckos({
  iceServers
});

console.log('iceServers:', iceServers);

const PORT = getEnvValue('SERVER_PORT');

io.addServer(server);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.onConnection(channel => {
  channel.on('message', data => {
    console.log('data:', data);
    channel.emit('message', data);
  });
  
  channel.on('ping', data => {
    channel.emit('pong', data);
  });
  
  channel.on('player-join', data => {
    console.log('player-join:', data);
    channel.broadcast.emit('player-joined', data);
  })
  
  channel.on('player-move', data => {
    console.log('player-move:', data);
    channel.broadcast.emit('player-moved', data);
  });
  
  channel.on('player-leave', data => {
    console.log('player-leave:', data);
    channel.broadcast.emit('player-left', data);
  });
  
  channel.on('player-attack', data => {
    console.log('player-attack:', data);
    channel.broadcast.emit('player-attacked', data);
  });
  
  channel.on('player-refresh', data => {
    console.log('player-refresh:', data);
    channel.broadcast.emit('player-refreshed', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('iceServers 2:', iceServers);