var app = require('http').createServer();
var io = require('socket.io').listen(app);
var player = require('./player');

app.listen(5463);

var players = [];

io.sockets.on('connection', function (socket) {
    console.log("Player join: " + socket.id);
    socket.on('disconnect', onClientDisconnect)
    socket.on('new player', onNewPlayer);
    socket.on('move player', onMovePlayer);
});

// Socket client has disconnected
function onClientDisconnect() {
    console.log('Player has disconnected: ' + this.id)

    var removePlayer = playerById(this.id)

    // Player not found
    if (!removePlayer) {
        util.log('Player not found: ' + this.id)
        return
    }

    // Remove player from players array
    players.splice(players.indexOf(removePlayer), 1)

}

function onMovePlayer(data) {
    movePlayer = playerById(this.id);
    movePlayer.setX(data.x);
    movePlayer.setY(data.y);
    this.broadcast.emit('move player', { id: movePlayer.getID(), x: movePlayer.getX(), y: movePlayer.getY() })
    // Debug
    //console.log("Move player id: " + movePlayer.getID() + " x: " + movePlayer.getX() + " y: " + movePlayer.getY());
}

function onNewPlayer(data) {
    var newPlayer = new player.Player(data.x, data.y);
    newPlayer.id = this.id;
    this.broadcast.emit('new player', { id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY() })
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
        this.emit('new player', { id: players[i].id, x: players[i].getX(), y: players[i].getY() })
    }
    players.push(newPlayer);
}

// Find player by ID
function playerById(id) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].getID() === id) {
            return players[i];
        }
    }
}