import { geckos, iceServers } from '@geckos.io/server';
import http from 'http';
import getEnvValue from './utils/environment.mjs';

const server = http.createServer();
const io = geckos({
  iceServers
});

const PORT = getEnvValue('SERVER_PORT');

io.addServer(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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