var game = new Phaser.Game(640, 640, Phaser.CANVAS, 'Phaser Multiplayer', { preload: preload, create: create, update: update, render: render });

var map: Phaser.Tilemap;
var player: Phaser.Sprite;
var background: Phaser.TilemapLayer;
var layer1: Phaser.TilemapLayer;
var cursors: Phaser.CursorKeys;
var timerJump = 0;

function preload() {
    game.load.tilemap('map', 'levels/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('textures', 'assets/textures.png');
    game.load.image('player', 'assets/player.png');
}


function create() {

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

}


function update() {
    player.body.velocity.x = 0;
    game.physics.arcade.collide(player, layer1);

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

}


function render() {

}