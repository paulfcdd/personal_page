var loadState = {
    preload: function () {
        game.load.image('bg', '../src/flappy/assets/sprites/background-day.png');
        game.load.image('base', '../src/flappy/assets/sprites/base.png');
        game.load.image('bird', '../src/flappy/assets/sprites/yellowbird-midflap.png');
        game.load.image('pipe', '../src/flappy/assets/sprites/pipe_2_ends.png');
        game.load.image('start', '../src/flappy/assets/sprites/message.png');
        game.load.image('finish', '../src/flappy/assets/sprites/gameover.png');
    },
    create: function () {
        game.state.start('menu')
    }
};