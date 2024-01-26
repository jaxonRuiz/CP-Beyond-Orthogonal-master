class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }
    init() {
        this.PLAYER_VELOCITY = 350;
    }

    preload() {
        this.load.spritesheet("character", "./assets/spritesheets/Character_002.png", {
            frameWidth: 48
        });
    }

    create() {       
        this.cameras.main.setBackgroundColor(0xDDDDDD);

        //creating animaitons:
        // still should add rest 
        this.anims.create({
            key: "idle-down",
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        });
        this.anims.create({
            key: "walk-down",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        });

        // adding player model with physics
        this.player = this.physics.add.sprite(width/2, height/2, "character", 0).setScale(2);
        cursors = this.input.keyboard.createCursorKeys();
        this.player.body.setCollideWorldBounds(true);

        this.player.body.setSize(32,32).setOffset(8, 16);

    }

    // normalize vectors to keep diagonal movement even (otherwise diagonals are higher bc of pythagorean theorem)
    // "why reinvent the wheel" no, im too prideful >:(    <- is joke cuz ofc it is
    // oh boy  i wonder how noticable the sleep deprevation is. my head is killing me
    update() {
        this.move();
    }
    move() {
        let playerVector = new Phaser.Math.Vector2(0, 0);
        let playerDirection = 'down';
        if (cursors.left.isDown) {
            playerVector.x = -1;
            playerDirection = "left"
        } else if(cursors.right.isDown) {
            playerVector.x = 1;
            playerDirection = "right"
        }
        
        if (cursors.down.isDown) {
            playerVector.y = 1;
            playerDirection = "down"
        } else if(cursors.up.isDown) {
            playerVector.y = -1;
            playerDirection = "up";
        }

        playerVector.normalize();

        // movement with physics
        this.player.setVelocity(playerVector.x * this.PLAYER_VELOCITY, playerVector.y * this.PLAYER_VELOCITY);
        
        // playing animation (only have down animations for now, can fill in the other animations later)
        let playerMovement;
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle';
        this.player.play(playerMovement + "-" + playerDirection, true); 


        // movement with position and vector
        //this.player.x += playerVector.x * this.PLAYER_VELOCITY;
        //this.player.y += playerVector.y * this.PLAYER_VELOCITY;
    }

}