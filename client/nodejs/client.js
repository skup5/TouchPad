const io = require('socket.io-client');

// Connect to server
const socket = io.connect('http://localhost:3000', {
    reconnect: true
});

var socketServer = null;

function send(type, data) {
    if (socketServer != null) {
        console.info("sending message: " + type)
        socketServer.emit(type, data);
    } else {
        console.error("none socketServer")
    }
}

function moveMouse(counter) {
    for (i = counter; i > 0; i--) {
        setTimeout(send, 1500, "moveRel", {
            "x": 100,
            "y": 50
        });
    }
}

// Add a connect listener
socket.on('connect', function(endpoint) {
    console.log("connected to socket");
    socketServer = socket;

    socket.on('hey', function(data) {
        console.log(data);
    });

    send("hey", "Hey, Im Node")

    moveMouse(1)
});
