const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
let countUserOnline = 0;
io.on('connection', socket => {
    socket.on('join', param => {
        console.log('user join')
        countUserOnline++;
        io.emit('countUserOnline', countUserOnline)
    })
    socket.on('message', param => {
        console.log('user mengirim pesan')
        io.emit('message', param)
    })
    socket.on('disconnect', () => {
        console.log('user disconnect');
        countUserOnline = Math.max(0, countUserOnline - 1);
        io.emit('countUserOnline', countUserOnline);
    });    
})
server.listen(3000)

const cors = require("cors");
app.use(cors());
