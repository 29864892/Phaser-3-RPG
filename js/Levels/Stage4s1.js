let s4s1Conv = true;

class Stage4s1 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage4s1',
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
		this.load.tilemapTiledJSON('map4s1', 'assets/stage4/stage4s1/stage4s1.json');
		this.load.spritesheet('tiles4s2', 'assets/stage4/stage4s2/house2tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		createPlayer(this, 500, 365);
		this.playerProperties.defaultDir = 'up';
		createPlayerAnims(this);
		this.playerInteractions();
		KeyboardInteractions(this);
		this.textActive = false;
		this.defeatMessage = false;
		this.createText = true;
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map4s1'});
		this.tiles = this.map.addTilesetImage('house2tiles', 'tiles4s2');
		this.floor = this.map.createStaticLayer('floor', this.tiles, 200, 150);
		this.objects = this.map.createDynamicLayer('objects', this.tiles, 200, 150);
		this.exitTile = this.map.createDynamicLayer('exit', this.tiles, 200, 150);
		this.objects.setCollisionByExclusion([-1]);
		this.createBorder();
		this.createExit();
		this.kid = this.physics.add.staticImage(448, 215, 's4Kid');
		this.createConv();
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
	
	playerInteractions(){
		this.physics.add.collider(this.objects, this.player1);
		this.physics.add.collider(this.player1, this.borderh);
		this.physics.add.collider(this.player1, this.borderh2);
		this.physics.add.collider(this.player1, this.borderv);
		this.physics.add.collider(this.player1, this.borderv2);
		this.physics.add.collider(this.player1, this.kid);
		this.physics.add.overlap(this.player1, this.exit, this.leave, null, this);
	}
	
	createConv(){
		this.currentText = ' ';
		this.dialog = true;
		this.talking = false;
		this.textNum = 0;
		//see gameText.js
		this.texts = [s4s1Text1, s4s1Text2, s4s1Text3, s4s1Text4, s4s1Text5, s4s1Text6, s4s1Text7, s4s1Text8, s4s1Text9];
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
			this.player1.setFrame(15);
		}
		this.checkInteraction();
	}
	
	checkInteraction(){
		this.interaction = CanInteract(this.player1, this.kid, 40);
		if(this.interaction && this.aButton.isDown){
			if(s4s1Conv){
				this.talking = true;
			}
			else{
				this.worldText(s4s1Text9);
			}
		}
		//automatically continue text
		if(this.talking){
			this.Message();
		}
		if(this.textActive && this.aButton.isDown){
			this.clearText();
		}
	}
	leave(){
		this.scene.start('Stage4');
	}
	
	Message(){
		if(s4s1Conv && this.dialog){
			this.cycleText(this.textNum, this.texts);
			
			if(!this.textActive && this.currentText === this.texts[this.textNum]){
					this.textNum++;
			}
		}
	}
	
	cycleText(textIndex, textsArr){
		if(textIndex < textsArr.length){
			if((this.currentTexttemp = this.worldText(textsArr[textIndex])) !== ' '){
				this.currentText = this.currentTexttemp;
				console.log(this.currentText);
			}
		}
		else{
			this.dialog = false;
			this.talking = false;
			s4s1Conv = false;
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