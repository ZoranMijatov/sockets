const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connection', (socket) => {
  // socket.emit('fuark', { message: 'cursed connection' });

  socket.on('sendMessage', (message) => {
    console.log('Message received on the server:', message);
  });
});

app.get('/api', (req, res) => {
  io.emit('hello', 'Hello from the server!');
  res.json({
    message: 'Wtf',
  });
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
