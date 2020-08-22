//global key for the current enemy object
var currentEnemy;
let edgel0rdDefeated = false;
//scene position values
let playerFinalXS1h2 = 0;
let playerFinalYS1h2 = 0;

class Stage1s1 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage1s1',
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
		this.load.tilemapTiledJSON('map1s1', 'assets/stage1/house1/house1.json');
		this.load.spritesheet('tiles1s1', 'assets/stage1/house1/house1tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		if(playerFinalXS1h2 === 0){
			createPlayer(this, 265, 360);
		}
		else{
			createPlayer(this, playerFinalXS1h2, playerFinalYS1h2);
		}
		this.playerProperties.defaultDir = 'up';
		this.startMoving = false;
		createPlayerAnims(this);
		this.createEdgel0rd();
		this.playerInteractions();
		KeyboardInteractions(this);
		this.textActive = false;
		this.defeatMessage = false;
		this.createText = true;
	}
	
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map1s1'});
		this.tiles = this.map.addTilesetImage('house1tiles', 'tiles1s1');
		this.floor = this.map.createStaticLayer('floor', this.tiles, 200, 150);
		this.objects = this.map.createDynamicLayer('objects', this.tiles, 200, 150);
		this.objects.setCollisionByExclusion([-1]);
		this.createBorder();
		this.createExit();
	}
	//player bounds for smaller world than screen
	createBorder(){
		this.borderh = this.physics.add.staticImage(400, 145, 'borderh');
		this.borderh.visible = false;
		this.borderh2 = this.physics.add.staticImage(400, 435, 'borderh');
		this.borderh2.visible = false;//200 300
		this.borderv = this.physics.add.staticImage(190, 300, 'borderv');
		this.borderv.visible = false;
		this.borderv2 = this.physics.add.staticImage(600, 300, 'borderv');
		this.borderv2.visible = false;
	}
	createExit(){
		this.objects.forEachTile(tile => {
			if(tile.index === 8){
				this.exitX = tile.getCenterX();
				this.exitY = tile.getCenterY();
				this.objects.removeTileAt(tile.x, tile.y);
			}
		})
		this.exit = this.physics.add.staticImage(this.exitX, this.exitY, 'exit');
		
	}
	createEdgel0rd(){
		this.edgel0rd = this.physics.add.staticImage(500, 200, 'edgel0rd');
	}
	playerInteractions(){
		this.physics.add.collider(this.objects, this.player1);
		this.physics.add.collider(this.player1, this.borderh);
		this.physics.add.collider(this.player1, this.borderh2);
		this.physics.add.collider(this.player1, this.borderv);
		this.physics.add.collider(this.player1, this.borderv2);
		this.physics.add.collider(this.player1, this.edgel0rd);
		this.physics.add.overlap(this.player1, this.exit, this.leave, null, this);
	}
	
	update(){
		if(!this.textActive){
			if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
			}
			updatePlayerMovement(this);
		}
		else{
			this.player1.setFrame(0);
		}
		this.checkInteraction();
	}
	
	checkInteraction(){
		this.interaction = CanInteract(this.player1, this.edgel0rd, 40);
		if(this.interaction && this.aButton.isDown){
			this.encounter1();
		}
		if(this.textActive && this.aButton.isDown){
			this.clearText();
		}
	}
	leave(){
		this.scene.start('Stage1');
	}
	//battle sequence
	encounter1(){
		if(!edgel0rdDefeated){
			this.worldText('Though the earth still spins, life no longer \nspins with it. Allow me to show you true despair!');
			if(!this.inputDelayStarted){
				this.inputDelay = this.time.addEvent({delay: 500, callback: this.allowStart, callbackScope: this, loop: false});
				this.inputDelayStarted = true;
			}
			if(this.startBattle()){
				if(!edgel0rdDefeated){
					this.clearText();
					this.start = false;
					currentEnemy = 'Edgel0rd';
					playerFinalXS1h2 = this.player1.x;
					playerFinalYS1h2 = this.player1.y;
					lastStage = 'Stage1s1';
					this.scene.start('Battle');
				}
			}
		}
		else{
			if(!this.defeatMessage){
				this.worldText('To think there would be another...');
				this.defeatMessage = true;
			}
			else{
				this.worldText('The end approaches...');
			}
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
	startBattle(){
		if(this.aButton.isDown && this.start === true){
			return true;
		}
		else{
			return false;
		}
	}
	
}
	