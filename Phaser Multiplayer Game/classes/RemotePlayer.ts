class RemotePlayer {

    private StartX;
    private StartY;
    private id: String;
    private player: Phaser.Sprite;
    private game: Phaser.Game;

    constructor(x, y, id, player: Phaser.Sprite, game: Phaser.Game) {
        this.setPlayer(player);
        this.StartX = x;
        this.StartY = y;
        this.setID(id);
        this.setGame(game);
        this.setSprite()
    }

    // Setters and getters

    setX(x) {
        this.player.x = x;
    }
    
    setY(y) {
        this.player.y = y;
    }
    
    setID(id) {
        this.id = id;
    }

    setPlayer(player: Phaser.Sprite) {
        this.player = player;
    }

    setGame(game: Phaser.Game) {
        this.game = game;
    }

    getGame() {
        return this.game;
    }

    getPlayer() {
        return this.player;
    }
     
    getX() {
        return this.player.x;
    }

    getY() {
        return this.player.y;
    }

    getID() {
        return this.id;
    }

    // Player functions

    setSprite() {
        this.player = this.game.add.sprite(this.StartX, this.StartY, 'player');
    }

}