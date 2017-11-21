var startScreen,
    spaceKey;


var menuState = {
    create: function () {
        game.add.sprite(0, 0, 'bg');
        startScreen = game.add.sprite(0, 0, 'start');
        startScreen.alignIn(game.world.bounds, Phaser.CENTER);
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.start, this);
        game.input.onTap.add(this.start, this);

    },
    start: function () {
        game.state.start('play');
    }
};