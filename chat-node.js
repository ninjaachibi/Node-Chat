const server = require('http').createServer();
const io = require('socket.io')(server);
const port = 3000

const namespace = io.of('/');
let guestCount = 0;

io.on('connection', (socket) => {
    console.log(socket.id, 'connected')

    socket.on('message', (evt) => {
        console.log(evt);
        socket.broadcast.emit('message', evt)
    })

    socket.on('user_joined', (username) => {

        // account for guest username
        if(!username) {
            guestCount++;
            username = `guest_${guestCount}`
        }

        // print connected clients
        io.clients((error, clients) => {
            if (error) throw error;
            console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
        });

        io.emit('user_joined', username)
    })
})
io.on('disconnect', (evt) => {
    console.log('disconnected')
})

server.listen(port, () => console.log(`server listening on port: ${port}`))