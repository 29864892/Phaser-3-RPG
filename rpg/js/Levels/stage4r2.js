let s4r2Txt = false;
let s4r2Txt1 = false;
let playerFinalXS4r2 = 0;
let playerFinalYS4r2 = 0;

class Stage4r2 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage4r2',
		type: Phaser.AUTO,
		width: 800,
		height: 600,
        physics: {
            default: 'arcade',
            arcade: {
				gravity: {y: 600},
				debug: false
            }
        }
    });
	}
	preload(){
		this.load.tilemapTiledJSON('map4r2', 'assets/stage4/stage4r2/stage4r2.json');
		this.load.spritesheet('tiles4', 'assets/stage4/stage4r2/stage4tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	
	create(){
		this.GenerateMap();
		if(playerFinalXS4r2 === 0 && playerFinalYS4r2 === 0){
			createPlayer(this, 735, 300);//initial player and playerProperties objects
		}
		else{
			createPlayer(this, playerFinalXS4r2, playerFinalYS4r2);
		}
		createPlayerAnims(this);//Create animations for the scene
		this.PlayerInteractions();
		this.setPlayerDefaultDir();
		KeyboardInteractions(this);
		this.textActive = false;
		this.defeatMessage = false;
		this.createText = true;
		if(!s4r2Txt1){
			this.worldText(s4r2Text1);
			s4r2Txt1 = true;
		}
	}
	setPlayerDefaultDir(){
		if(this.player1.x > 700){
			this.playerProperties.defaultDir = 'left';
			this.player1.anims.play('stopleft');
		}
		else if(this.player1.x < 100){
			this.playerProperties.defaultDir = 'right';
			this.player1.anims.play('stopright');
		}
		else{
			this.playerProperties.defaultDir = 'down';
			this.player1.anims.play('stopdown');
		}
		this.startMoving = false;
	}
	
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map4r2'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage4tiles','tiles4');
		this.roadLayer = this.map.createStaticLayer('ground', this.tiles, 0, 0);
		this.buildingLayer2 = this.map.createStaticLayer('housebg', this.tiles, 0, 0);
		this.buildingLayer = this.map.createStaticLayer('houses', this.tiles, 0, 0);
		this.buildingLayer.setCollisionByExclusion([-1]);
		this.walls = this.map.createStaticLayer('wall', this.tiles, 0, 0);
		this.walls.setCollisionByExclusion([-1]);
		this.createExit();
		this.prompt = this.physics.add.staticImage(540, 300, 'borderv');
		this.prompt.visible = false;
		this.promptShown = false;
	}
	
	createExit(){
		this.exit = this.physics.add.staticImage(800, 300, 'borderv');
		this.exit.visible = false;
		this.exitr3 = this.physics.add.staticImage(0, 300, 'borderv');
		this.exitr3.visible = false;
		this.exitr4 = this.physics.add.staticImage(400, 50, 'borderh');
		this.exitr4.visible = false;
	}
	
	PlayerInteractions(){
		this.buildingLayer.setCollisionByExclusion([-1]);//https://photonstorm.github.io/phaser3-docs/Phaser.Tilemaps.Tilemap.html
		this.physics.add.collider(this.buildingLayer, this.player1);
		this.physics.add.collider(this.walls, this.player1);
		this.physics.add.overlap(this.exit, this.player1, this.enterR1, null, this);
		this.physics.add.overlap(this.exitr3, this.player1, this.enterR3, null, this);
		this.physics.add.overlap(this.prompt, this.player1, this.showMessage, null, this);
		this.physics.add.overlap(this.exitr4, this.player1, this.enterR4, null, this);
	}
	//Enter houses
	enterR1(){
		playerFinalXS4r2 = this.player1.x + 5;
		playerFinalYS4r2 = this.player1.y;
		this.scene.start('Stage4');
	}
	enterR3(){
		playerFinalXS4r2 = this.player1.x + 5;
		playerFinalYS4r2 = this.player1.y;
		this.scene.start('Stage4r3');
	}
	enterR4(){
		playerFinalXS4r2 = this.player1.x;
		playerFinalYS4r2 = this.player1.y + 5;
		this.scene.start('Stage4r4');
	}
	showMessage(){
		if(!s4r2Txt){
			this.worldText('You hear someone cry for help ahead.');
			s4r2Txt = true;
		}
	}
	
	update(){
		if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
		}
		if(!this.textActive){
			updatePlayerMovement(this);
		}
		else{
			this.player1.body.setVelocityX(0);
			this.player1.body.setVelocityY(0);
			this.player1.anims.play('stopleft');
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
	//first message
	worldText(boxText){
		if(!this.textActive && !this.start && this.createText){
			this.box = this.add.image(400, 500, 'textBox');
			this.text = this.add.text(100, 410, boxText,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
			this.textActive = true;
			this.TextDelay = this.time.addEvent({delay: 500, callback: this.allowRemoval, callbackScope: this, loop: false});
			this.clearTextBox = false;
			return boxText;
		}
		else{
			return ' ';
		}
	}
	//triggered by timer
	allowStart(){
		this.start = true;
	}
	allowRemoval(){
		this.clearTextBox = true;
	}
	allowText(){
		this.createText = true;
	}
}
