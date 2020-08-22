let playerFinalXS2r1 = 0;
let playerFinalYS2r1 = 0;
let messageShown2r1 = false;
class Stage2r1 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage2r1',
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
		this.load.tilemapTiledJSON('map2r1', 'assets/stage2/stage2r1/stage2r1.json');
		this.load.spritesheet('tiles2r1', 'assets/stage2/stage2tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		if(playerFinalXS2r1 === 0 && playerFinalYS2r1 === 0){
			createPlayer(this, 754, 298);//initial player and playerProperties objects
		}
		else{
			createPlayer(this, playerFinalXS2r1, playerFinalYS2r1);
		}
		createPlayerAnims(this);//Create animations for the scene
		if(this.player1.x < 400){
			this.playerProperties.defaultDir = 'right';
		}
		else{
			this.playerProperties.defaultDir = 'left';
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
		this.map = this.make.tilemap({key: 'map2r1'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage2tiles','tiles2r1');
		this.grassLayer = this.map.createStaticLayer('grass', this.tiles, 0, 0);
		this.trees = this.map.createStaticLayer('trees', this.tiles, 0, 0);
		this.trees.setCollisionByExclusion([-1]);
		this.prompt = this.physics.add.staticImage(130, 300, 'borderv');
		this.prompt.visible = false;
	}
	createExit(){
		this.exit = this.physics.add.staticImage(800, 300, 'borderv');
		this.exit.visible = false;
		this.lakeExit = this.physics.add.staticImage(0, 240, 'borderv');
		this.lakeExit.visible = false;
	}
	PlayerInteractions(){
		this.physics.add.collider(this.trees, this.player1);
		this.physics.add.overlap(this.exit, this.player1, this.enter2, null, this);
		this.physics.add.overlap(this.lakeExit, this.player1, this.enterLake, null, this);
		if(!s3Clear){
			this.physics.add.overlap(this.prompt, this.player1, this.showMessage, null, this);
		}
	}
	enter2(){
		playerFinalXS2r1 = this.player1.x - 10;
		playerFinalYS2r1 = this.player1.y;
		this.scene.start('Stage2');
	}
	enterLake(){
		playerFinalXS2r1 = this.player1.x + 10;
		playerFinalYS2r1 = this.player1.y;
		this.scene.start('Stage3');	
	}
	showMessage(){
		if(!messageShown2r1){
			this.player1.setVelocityX(0);
			this.player1.setVelocityY(0);
			this.player1.setFrame(0);
			this.worldText('You hear screaming from ahead.');
			messageShown2r1 = true;
		}
	}
	update(){
		if(!this.textActive){
			if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
			}
			updatePlayerMovement(this);
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