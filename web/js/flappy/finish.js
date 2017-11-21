var finishSign,
    labelScore;

var finishState = {
    create: function () {
        game.add.sprite(0,0, 'bg');
        finishSign = game.add.sprite(0,0, 'finish');

        if (score === -1) {
            score = 0;
        }
        labelScore = game.add.text(140, 285, score, { font: "30px flappy", fill: "#ffffff" });
        finishSign.alignIn(game.world.bounds, Phaser.CENTER);
        spaceKey.onDown.add(this.restart, this);
        game.input.onTap.add(this.restart, this);
    },
    restart: function () {
        game.state.start('menu');
        score = -1;
    }
};