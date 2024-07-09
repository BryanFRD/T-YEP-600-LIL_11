import { geckos } from '@geckos.io/server';

const io = geckos({
  
});

io.onConnection(channel => {
  console.log(`New client connected: ${channel.id}`);

  channel.onDisconnect(() => {
    console.log(`Client disconnected: ${channel.id}`);
  });

  channel.on('message', data => {
    console.log(`Received message from client ${channel.id}: ${data}`);
    // Handle the received message here
  });
  
  channel.on('ping', (data) => {
    console.log(`Received ping from client ${channel.id}`);
    channel.emit('pong', data);
  });

  // Send a message to the client
  channel.emit('message', 'Hello from the server!');
});