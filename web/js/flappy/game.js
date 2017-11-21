var game = new Phaser.Game(288, 512, Phaser.AUTO, '');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('finish', finishState);

game.state.start('boot');