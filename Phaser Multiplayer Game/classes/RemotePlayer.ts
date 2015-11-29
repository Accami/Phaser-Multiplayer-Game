class RemotePlayer {

    private StartX;
    private StartY;
    private id: string;
    private player: Phaser.Sprite;
    private game: Phaser.Game;
    private text: Phaser.Sprite;

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
        this.text = this.game.add.text(0, 0, this.id, { font: "20px Arial", fill: "#fff" });
        this.updateText();
        this.game.physics.enable(this.player);
        this.game.physics.arcade.gravity.y = 200;
    }

    updateText() {
        this.text.x = this.getX() - this.text.width / 2;
        this.text.y = this.getY() - 30;
    }

    move(x, y) {
        this.setX(x);
        this.setY(y);
        this.updateText();
    }

    update() {
        this.game.physics.arcade.collide(this.player, layer1);
        this.game.physics.arcade.collide(player, this.player);
        this.updateText();
    }

}