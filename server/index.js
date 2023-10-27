import { Server } from "socket.io";


const io = new Server({
    cors: {
        origin: 'http://localhost:5173'
    }
})

io.listen(3001)

const characters = []

const generateRandomPosition = () => {
    return [Math.random() * 3, 0, Math.random() * 3]
}

const generateRandomHex = () => { 
    return '#' + Math.floor(Math.random() * 17777215).toString(16)
}

io.on("connection", (socket) => {
    console.log('user Connected')

    characters.push({
        id: socket.id,
        position: generateRandomPosition(),
        hairColor: generateRandomHex(),
        topColor: generateRandomHex(),
        bottomColor: generateRandomHex(),
    })

    socket.emit("hello")

    io.emit("characters", characters)

    socket.on('move', (value) => {
        const id = characters.findIndex((character) => character.id === socket.id)
        characters[id].position = value
        io.emit("characters", characters)
    })

    socket.on('disconnect', () => {
        console.log('user Disconnected')

        characters.splice(characters.findIndex((character) => character.id === socket.id), 1)
        
        io.emit("characters", characters)
    })
})