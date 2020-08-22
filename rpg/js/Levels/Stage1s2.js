//player's house
//global key for the current enemy object
var currentEnemy;

class Stage1s2 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage1s2',
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
		this.load.tilemapTiledJSON('map1s2', 'assets/stage1/house2/house2.json');
		this.load.spritesheet('tiles1s2', 'assets/stage1/house2/house2tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		createPlayer(this, 265, 360);
		this.playerProperties.defaultDir = 'up';
		this.startMoving = false;
		createPlayerAnims(this);
		this.playerInteractions();
		KeyboardInteractions(this);
		this.textActive = false;
		this.defeatMessage = false;
		this.createText = true;
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map1s2'});
		this.tiles = this.map.addTilesetImage('house2tiles', 'tiles1s2');
		this.floor = this.map.createStaticLayer('floor', this.tiles, 200, 150);
		this.objects = this.map.createDynamicLayer('Objects', this.tiles, 200, 150);
		this.exitTile = this.map.createDynamicLayer('exit', this.tiles, 200, 150);
		this.table = this.map.createDynamicLayer('missionTable', this.tiles, 200, 150);
		this.objects.setCollisionByExclusion([-1]);
		this.createBorder();
		this.createExit();
		this.createTable();
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
			if(tile.index === 10){
				this.exitX = tile.getCenterX();
				this.exitY = tile.getCenterY();
				this.objects.removeTileAt(tile.x, tile.y);
			}
		})
		this.exit = this.physics.add.staticImage(this.exitX, this.exitY, 'exit');
		
	}
	createTable(){
		this.mTFound = false;
		this.table.forEachTile(tile => {
			if(tile.index === 5 && !this.mTFound){
				this.tableX = tile.getCenterX();
				this.tableY = tile.getCenterY();
				this.MTFound = true;
			}
		})
		this.table = this.physics.add.staticImage(this.tableX+20, this.tableY+20, 'table');
	}
	
	playerInteractions(){
		this.physics.add.collider(this.objects, this.player1);
		this.physics.add.collider(this.player1, this.borderh);
		this.physics.add.collider(this.player1, this.borderh2);
		this.physics.add.collider(this.player1, this.borderv);
		this.physics.add.collider(this.player1, this.borderv2);
		this.physics.add.collider(this.player1, this.table);
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
		this.interaction = CanInteract(this.player1, this.table, 60);
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
		this.worldText('Dear Son, \n Your Mother is in the hospital and I am currently\n with her. Go talk to our neighbor Mr. Robster, \n he knows how to get here. \n       Love, Dad');
		
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