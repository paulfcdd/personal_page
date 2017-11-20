var
    bird,
    base,
    ground,
    pipe,
    labelScore,
    score = -1,
    pipes;


var mainState = {
    preload: function () {
        game.load.image('bg_day', '../src/flappy/assets/sprites/background-day.png');
        game.load.image('base', '../src/flappy/assets/sprites/base.png');
        game.load.image('bird', '../src/flappy/assets/sprites/bluebird-midflap.png');
        game.load.image('pipe', '../src/flappy/assets/sprites/pipe-green.png');
        game.load.image('test', '../src/flappy/pipe.png');
        game.load.image('simple_pipe', '../src/flappy/assets/sprites/pipe.png');
        game.load.image('pipe_2_ends', '../src/flappy/assets/sprites/pipe_2_ends.png');
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0,0, 'bg_day');

        base = game.add.group();
        base.enableBody = true;
        ground = base.create(0, game.world.height - 64, 'base');
        ground.body.immovable = true;

        pipes = game.add.group();
        pipes.enableBody = true;


        labelScore = game.add.text(100, 20, '0', { font: "30px Arial", fill: "#ffffff" });

        game.world.bringToTop(base);

        bird = game.add.sprite(100,250, 'bird');
        game.physics.arcade.enable(bird);
        bird.body.bounce.y = 0.2;
        bird.body.gravity.y = 1000;

        bird.anchor.setTo(-0.2, 0.5);

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
		
		game.input.onTap.add(this.jumpOnTap, this);

		
        game.time.events.loop(1500, this.addRowOfPipes, this);

    },
    update: function () {

        if (bird.angle < 20)
            bird.angle += 1;

        var hitGround = game.physics.arcade.collide(bird, ground);

        game.physics.arcade.overlap(bird, pipes, this.restartGame, null, this);

        if (hitGround === true) {
            this.restartGame()
        }

    },
    jump: function () {
        bird.body.velocity.y = -330;
        game.add.tween(bird).to({angle: -20}, 100).start();

    },
	jumpOnTap: function() {
		bird.body.velocity.y = -250;
        game.add.tween(bird).to({angle: -20}, 100).start();
	},
    checkIfOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    },
    restartGame: function () {
        game.state.start('main');
        score = 0;
    },
    getPipeYPos: function (min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    },
    addPipe: function (x, y) {
        pipe = game.add.sprite(x, game.world.height - y, 'pipe_2_ends');
        // Add the pipe to our previously created group
        pipes.add(pipe);
        // Enable physics on the pipe
        game.physics.arcade.enable(pipe);
        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -170;
        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }
    ,
    addRowOfPipes: function() {

        var bottomPos = this.getPipeYPos(100,300),
            hole = 440,
			upperPos = bottomPos + hole;

        this.addPipe(280, bottomPos);
        this.addPipe(278, upperPos);
		this.addPoint();

    },
    addPoint: function () {
        score += 1;
        labelScore.text = score;
    }
};

var game = new Phaser.Game(288, 512, Phaser.AUTO, '');

game.state.add('main', mainState);

game.state.start('main');