var app = require('http').createServer();
var io = require('socket.io').listen(app);
var player = require('./player');

app.listen(80);

var players = [];

io.sockets.on('connection', function (socket) {
    console.log("Player join: "+socket.id);
    socket.on('new player', onNewPlayer);
});

function onNewPlayer(data) {
    var newPlayer = new player.Player(data.x, data.y);
    newPlayer.id = this.id;
    for (i = 0; i < players.length; i++) {
        existingPlayer = players[i]
        this.emit('new player', { id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY() })
    }
    players.push(newPlayer);
}