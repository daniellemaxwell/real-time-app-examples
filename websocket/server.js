const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 5000;

const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
  console.log(`Socket.IO server running at ${PORT}`);
});