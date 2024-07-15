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
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('iceServers 2:', iceServers);