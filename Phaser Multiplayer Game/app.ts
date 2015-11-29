var game = new Phaser.Game(640, 640, Phaser.CANVAS, 'Phaser Multiplayer', { preload: preload, create: create, update: update, render: render });

var map: Phaser.Tilemap;
var player: Phaser.Sprite;
var players = [];
var MovePlayer: RemotePlayer;
var background: Phaser.TilemapLayer;
var layer1: Phaser.TilemapLayer;
var cursors: Phaser.CursorKeys;
var timerJump = 0;

var socket;
var serverIP = "http://188.120.250.4:5463";

function preload() {
    game.load.tilemap('map', 'levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('textures', 'assets/textures.png');
    game.load.image('player', 'assets/player.png');
}


function create() {
    socket = io.connect(serverIP);

    map = game.add.tilemap('map');
    map.addTilesetImage('textures');

    background = map.createLayer('Background');
    layer1 = map.createLayer('Layer1');
    map.setCollisionBetween(1, 12, true, layer1);

    player = game.add.sprite(32, 32, 'player');

    game.physics.enable(player);
    game.physics.arcade.gravity.y = 200;

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();


    setEventHandlers();
}

function setEventHandlers() {
    // Socket connection successful
    socket.on('connect', onSocketConnected);
    socket.on('new player', onNewPlayer);
    socket.on('move player', onMovePlayer);
}

function onSocketConnected() {
    console.log('Connected to socket server')

    // Send local player data to the game server
    socket.emit('new player', { x: player.x, y: player.y })
}

function onNewPlayer(data) {
    console.log('New player connected:', data.id)

    // Add new player to the remote players array
    players.push(new RemotePlayer(data.x, data.y, data.id, player, game));
}

function onMovePlayer(data) {
    MovePlayer = playerById(data.id);
    if (!MovePlayer) {
        console.log("Player " + data.id +" not found");
    } else {
        MovePlayer.move(data.x, data.y);
    }
}

// Find player by ID
function playerById(id) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].getID() === id) {
            return players[i];
        }
    }
}

function update() {
    player.body.velocity.x = 0;
    game.physics.arcade.collide(player, layer1);

    for (var i = 0; i < players.length; i++) {
        players[i].update();
        game.physics.arcade.collide(players[i], player);
    }

    if (cursors.up.isDown && player.body.onFloor() && game.time.now > timerJump) {
        player.body.velocity.y = -200;
        timerJump = game.time.now + 750;
    }

    if (cursors.right.isDown) {
        player.body.velocity.x = 100;
    }

    if (cursors.left.isDown) {
        player.body.velocity.x = -100;
    }
    socket.emit('move player', { x: player.x, y: player.y });

}


function render() {

}