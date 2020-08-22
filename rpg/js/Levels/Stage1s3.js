//Mr. Robster's house
//global key for the current enemy object
var currentEnemy;

class Stage1s3 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage1s3',
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
		this.load.tilemapTiledJSON('map1s3', 'assets/stage1/house3/house3.json');
		this.load.spritesheet('tiles1s3', 'assets/stage1/house3/house3tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		createPlayer(this, 460, 368);
		createPlayerAnims(this);
		this.robster = this.physics.add.staticImage(500, 200, 'Mr.Robster');
		this.playerInteractions();
		this.playerProperties.defaultDir = 'up';
		this.startMoving = false;
		KeyboardInteractions(this);
		this.textActive = false;
		this.defeatMessage = false;
		this.createText = true;
		this.message1 = true;
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map1s3'});
		this.tiles = this.map.addTilesetImage('house3tiles', 'tiles1s3');
		this.floor = this.map.createStaticLayer('floor', this.tiles, 200, 150);
		this.objects = this.map.createDynamicLayer('Objects', this.tiles, 200, 150);
		this.exitTile = this.map.createDynamicLayer('exit', this.tiles, 200, 150);
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
		this.exitTile.forEachTile(tile => {
			if(tile.index === 11){
				this.exitX = tile.getCenterX();
				this.exitY = tile.getCenterY();
				this.objects.removeTileAt(tile.x, tile.y);
			}
		})
		this.exit = this.physics.add.staticImage(this.exitX, this.exitY, 'exit');
		
	}
	
	playerInteractions(){
		this.physics.add.collider(this.objects, this.player1);
		this.physics.add.collider(this.player1, this.borderh);
		this.physics.add.collider(this.player1, this.borderh2);
		this.physics.add.collider(this.player1, this.borderv);
		this.physics.add.collider(this.player1, this.borderv2);
		this.physics.add.collider(this.player1, this.robster);
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
		this.interaction = CanInteract(this.player1, this.robster, 40);
		if(this.interaction && this.aButton.isDown){
			this.Message();
		}
		if(this.textActive && this.aButton.isDown){
			this.clearText();
		}
	}
	leave(){
		this.scene.start('Stage1');
	}
	//battle sequence
	Message(){
		if(this.message1){
			this.worldText('Finally here are ya kid? Was wondrin whether or \nnot ya cared bout your folks.');
			this.message1 = false;
		}
		else{
			this.worldText('To get to the General Hospital, ya gonna have to \ntake a detour kid. Some youngsters are blocking \nthe path so try going another way.');
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