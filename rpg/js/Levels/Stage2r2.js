let playerFinalXS2r2 = 0;
let playerFinalYS2r2 = 0;
let s2r2Message = false;
class Stage2r2 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage2r2',
		type: Phaser.AUTO,
		width: 800,
		height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
				debug: false
            }
        }
    });
	}
	preload(){
		this.load.tilemapTiledJSON('map2r2', 'assets/stage2/stage2r2/stage2r2.json');
		this.load.spritesheet('tiles2r2', 'assets/stage2/stage2r2/stage2r2tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		if(playerFinalXS2r2 === 0 && playerFinalYS2r2 === 0){
			createPlayer(this, 420, 560);//initial player and playerProperties objects
		}
		else{
			createPlayer(this, playerFinalXS2r2, playerFinalYS2r2);
		}
		createPlayerAnims(this);//Create animations for the scene
		if(this.player1.y > 100){
			this.playerProperties.defaultDir = 'up';
		}
		else{
			this.playerProperties.defaultDir = 'down';
		}
		this.startMoving = false;
		this.createExit();
		this.PlayerInteractions();
		KeyboardInteractions(this);
		this.textActive = false;
		this.createText = true;
		this.clearTextBox = false;
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map2r2'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage2tiles','tiles2r2');
		this.grassLayer = this.map.createStaticLayer('grass', this.tiles, 0, 0);
		this.trees = this.map.createStaticLayer('trees', this.tiles, 0, 0);
		this.trees.setCollisionByExclusion([-1]);
		this.messageObject = this.physics.add.staticImage(420, 375, 'borderh');
		this.messageObject.visible = false;
	}
	createExit(){
		this.sExit = this.physics.add.staticImage(350, 600, 'borderh');
		this.townEnter = this.physics.add.staticImage(418, 40, 'borderh');
		this.sExit.visible = false;
		this.townEnter.visible = false;
	}
	PlayerInteractions(){
		this.physics.add.collider(this.trees, this.player1);
		this.physics.add.overlap(this.sExit, this.player1, this.enters2, null, this);
		this.physics.add.overlap(this.townEnter, this.player1, this.enters4, null, this);
		this.physics.add.overlap(this.messageObject, this.player1, this.message, null, this);
	}
	enters2(){
		playerFinalXS2r2 = this.player1.x;
		playerFinalYS2r2 = this.player1.y;
		this.scene.start('Stage2');
	}
	enters4(){
		playerFinalXS2r2 = this.player1.x;
		playerFinalYS2r2 = this.player1.y;
		this.scene.start('Stage4');
	}
	message(){
		if(!s2r2Message){
			this.worldText('Luna:\nThere\'s smoke rising from the town. \nLet\'s investigate.');
			s2r2Message = true;
		}
	}
	update(){
		//console.log(this.player1.x + ' ' + this.player1.y);
		if(!this.textActive){
			if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
			}
			updatePlayerMovement(this);
		}
		else{
			this.player1.body.setVelocityX(0);
			this.player1.body.setVelocityY(0);
			this.player1.setFrame(15);
		}
		if(this.textActive && this.aButton.isDown){
			this.clearText();
		}
	}

	clearText(){
		if(this.textActive && this.clearTextBox){
			this.box.destroy();
			this.text.destroy();
			this.textActive = false;
			this.createText = false;
			this.newTextDelay = this.time.addEvent({delay: 500, callback: this.allowText, callbackScope: this, loop: false});
		}
	}
	//display message
	worldText(boxText){
		if(!this.textActive && this.createText){
			this.box = this.add.image(400, 500, 'textBox');
			this.text = this.add.text(100, 410, boxText,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
			this.textActive = true;
			this.TextDelay = this.time.addEvent({delay: 500, callback: this.allowRemoval, callbackScope: this, loop: false});
			this.clearTextBox = false;
		}
	}
	
	allowRemoval(){
		this.clearTextBox = true;
	}
	allowText(){
		this.createText = true;
	}
}