playerFinalXS4r5 = 0;
playerFinalYS4r5 = 0;

class Stage4r5 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage4r5',
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
		this.load.tilemapTiledJSON('map4r5', 'assets/stage4/Stage4r5/stage4r5.json');
		this.load.spritesheet('tiles4r5', 'assets/stage4/stage4r5/stage4tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		if(playerFinalXS4r5 === 0 && playerFinalYS4r5 === 0){
			createPlayer(this, 745, 296);//initial player and playerProperties objects
		}
		else{
			createPlayer(this, playerFinalXS4r5, playerFinalYS4r5);
		}
		//console.log(this.player1.x + ' ' + this.player1.y);
		createPlayerAnims(this);//Create animations for the scene
		this.playerProperties.defaultDir = 'left';
		this.startMoving = false;
		this.createExit();
		this.PlayerInteractions();
		KeyboardInteractions(this);
		
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map4r5'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage4tiles','tiles4r5');
		this.groundLayer = this.map.createStaticLayer('ground', this.tiles, 0, 0);
		this.wall = this.map.createStaticLayer('walls', this.tiles, 0, 0);
		this.wall.setCollisionByExclusion([-1]);
		this.createNPCs();
		this.createConv();
	}
	
	createNPCs(){
		this.map = this.physics.add.staticImage(500, 300, 'help4r5');
		this.medic = this.physics.add.staticImage(340, 290, 'medic');
	}
	createConv(){
		this.textActive = false;//whether there is currently text visible
		this.createText = true;//whether a new text can be createDocumentFragment
		this.clearTextBox = false;//whether the current textbox can be removed
	}
	createExit(){
		this.exit = this.physics.add.staticImage(800, 300, 'borderv');
		this.exit.visible = false;
		this.exitR3 = this.physics.add.staticImage(400, 580, 'borderh');
		this.exitR3.visible = false;
		this.hospitalEntrance = this.physics.add.staticImage(290, 380, 'exit');
		this.hospitalEntrance.angle = 90;
	}
	PlayerInteractions(){
		this.physics.add.collider(this.wall, this.player1);
		this.physics.add.collider(this.map, this.player1);
		this.physics.add.collider(this.medic, this.player1);
		this.physics.add.overlap(this.exitR3, this.player1, this.enter4r3, null, this);
		this.physics.add.overlap(this.exit, this.player1, this.enter4r4, null, this);
		this.physics.add.overlap(this.hospitalEntrance, this.player1, this.enterHospital, null, this);
	}
	enter4r3(){
		playerFinalXS4r5 = this.player1.x;
		playerFinalYS4r5 = this.player1.y - 5;
		this.scene.start('Stage4r3');
	}
	enter4r4(){
		playerFinalXS4r5 = this.player1.x - 5;
		playerFinalYS4r5 = this.player1.y;
		this.scene.start('Stage4r4');
	}
	enterHospital(){
		playerFinalXS4r5 = this.player1.x + 5;
		playerFinalYS4r5 = this.player1.y;
		this.scene.start('Stage4r4');	
	}
	
	update(){
		console.log(this.player1.x + ' ' + this.player1.y);
		this.playerMovement();
		if(this.textActive && this.aButton.isDown){
			this.clearText();
		}
		this.updateText();
	}
	playerMovement(){
		if(!this.textActive && !this.textCycling){
			if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
			}
			updatePlayerMovement(this);
		}
		else{
			this.player1.body.setVelocityX(0);
			this.player1.body.setVelocityY(0);
			if(this.startMoving){
				this.player1.anims.play('stop' + this.playerProperties.currentDirection(false));
			}
		}
	}
	updateText(){
		this.interactionM = CanInteract(this.player1, this.map, 40);
		this.interactionD = CanInteract(this.player1, this.medic, 40);
		if(this.interactionM && this.aButton.isDown){//show map text
			this.worldText(s4r5Text1);
		}
		else if(this.interactionD && this.aButton.isDown){//show medic text
			this.worldText(s4r5Text2);
		}
	}
	//Message functions
	clearText(){
		if(this.textActive && this.clearTextBox){
			this.box.destroy();
			this.text.destroy();
			this.textActive = false;
			this.createText = false;
			this.newTextDelay = this.time.addEvent({delay: 500, callback: this.allowText, callbackScope: this, loop: false});
		}
	}
	
	worldText(boxText){
		if(!this.textActive && this.createText){
			this.boxY = 500;
			this.textY = 410;
			if(this.player1.y >= 300){
				this.boxY = 100;
				this.textY = 10;
			}
			this.box = this.add.image(400, this.boxY, 'textBox');
			this.text = this.add.text(100, this.textY, boxText,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
			this.textActive = true;
			this.TextDelay = this.time.addEvent({delay: 500, callback: this.allowRemoval, callbackScope: this, loop: false});
			this.clearTextBox = false;
			return boxText;
		}
		else{
			return ' ';
		}
	}
	
	allowRemoval(){
		this.clearTextBox = true;
	}
	allowText(){
		this.createText = true;
	}
}