const server = require('http').createServer();
const io = require('socket.io')(server);
const port = 3000

io.on('connection', (socket) => {
    console.log('connected')

    socket.on('message', (evt) => {
        console.log(evt);
        socket.broadcast.emit('message', evt)
    })
})
io.on('disconnect', (evt) => {
    console.log('disconnected')
})

server.listen(port, () => console.log(`server listening on port: ${port}`))