playerFinalXS4r4 = 0;
playerFinalYS4r4 = 0;
Stage4r4Clear = false;//true when boss is defeated
s4r4VText = false;//true after victory text is shown

class Stage4r4 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage4r4',
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
		this.load.tilemapTiledJSON('map4r4', 'assets/stage4/stage4r4/stage4r4.json');
		this.load.spritesheet('tiles4r4', 'assets/stage4/stage4r4/stage4tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		if(playerFinalXS4r4 === 0 && playerFinalYS4r4 === 0){
			createPlayer(this, 400, 535);//initial player and playerProperties objects
		}
		else{
			createPlayer(this, playerFinalXS4r4, playerFinalYS4r4);
		}
		//console.log(this.player1.x + ' ' + this.player1.y);
		createPlayerAnims(this);//Create animations for the scene
		this.playerProperties.defaultDir = 'up';
		this.startMoving = false;
		this.createExit();
		this.PlayerInteractions();
		KeyboardInteractions(this);
		
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map4r4'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage4tiles','tiles4r4');
		this.groundLayer = this.map.createStaticLayer('ground', this.tiles, 0, 0);
		this.wall = this.map.createStaticLayer('wall', this.tiles, 0, 0);
		this.fountain = this.map.createStaticLayer('fountain', this.tiles, 0, 0);
		this.wall.setCollisionByExclusion([-1]);
		this.fountain.setCollisionByExclusion([-1]);
		this.createNPCs();
		this.createConv();
	}
	
	createNPCs(){
		if(!Stage4r4Clear){
			this.gangLeader = this.physics.add.staticImage(341, 420, 'gangLeader');
			this.captain = this.physics.add.staticImage(460, 420, 'captain4r4');
		}
		else{
			this.gangLeader = this.physics.add.staticImage(341, 420, 'gangLeaderF');
		}
		this.luna = this.physics.add.staticImage(350, 530, 'Luna2d');
		this.textEvent1 = false;//flag for removing soldier and changing dir of gangLeader
	}
	createConv(){
		this.textActive = false;
		this.createText = true;
		this.clearTextBox = false;
		this.textCycling = false;
		this.currentText = ' ';
		this.dialog = false;//whether or not event text is active
		this.textNum = 0;
		//see gameText.js
		this.vTextNum = 0;
		this.eTextNum = 0;
		this.showEtext = true;//whether or not event text can be started
	}
	createExit(){
		this.exit = this.physics.add.staticImage(800, 300, 'borderv');
		this.exit.visible = false;
		this.exitR2 = this.physics.add.staticImage(400, 580, 'borderh');
		this.exitR2.visible = false;
		this.exitR5 = this.physics.add.staticImage(0, 300, 'borderv');
		this.exitR5.visible = false;
	}
	PlayerInteractions(){
		this.physics.add.collider(this.wall, this.player1);
		this.physics.add.collider(this.fountain, this.player1);
		this.physics.add.collider(this.luna, this.player1);
		this.physics.add.collider(this.gangLeader, this.player1);
		this.physics.add.overlap(this.exitR2, this.player1, this.enter4r2, null, this);
		this.physics.add.overlap(this.exitR5, this.player1, this.enter4r5, null, this);
	}
	enter4r2(){
		playerFinalXS4r4 = this.player1.x;
		playerFinalYS4r4 = this.player1.y - 5;
		this.scene.start('Stage4r2');
	}
	enter4r5(){
		playerFinalXS4r4 = this.player1.x + 5;
		playerFinalYS4r4 = this.player1.y;
		this.scene.start('Stage4r5');
	}
	
	update(){
		this.playerMovement();
		if(this.textActive && this.aButton.isDown){
			this.clearText();
		}
		this.updateText();
		this.startBattle();
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
	//cycle through first array of text before battle
	updateText(){
		if(!Stage4r4Clear){//before battle
			this.cycleText(this.textNum, s4r4Texts);
			this.updateTextNum();
		}
		else if(!s4r4VText){//after battle victory
			this.cycleText(this.vTextNum, s4r4VTexts); 
			this.updateVTextNum();
		}
		this.interactionL = CanInteract(this.luna, this.player1, 40);
		if(this.interactionL && this.aButton.isDown && this.showEtext){
			this.dialog = true;
		}
		if(this.interactionL && this.dialog && this.showEtext){
			this.cycleText(this.eTextNum, s4r4ETexts);
			this.updateEtext();
		}
	}
	updateTextNum(){
		if(!this.textActive && this.currentText === s4r4Texts[this.textNum]){
				this.textNum++;
		}
		//remove soldier and rotate
		if(this.textNum === 8 && !this.textEvent1){
			this.captain.destroy();
			this.textEvent1 = true;
			this.gangLeader.angle = 90;
		}
	}
	updateVTextNum(){
		if(!this.textActive && this.currentText === s4r4VTexts[this.vTextNum]){
			this.vTextNum++;
		}	
		if(this.vTextNum >= s4r4VTexts.length){
			s4r4VText = true;
			this.textCycling = false;
		}
	}
	updateEtext(){
		console.log(this.showEtext);
		if(!this.textActive && this.currentText === s4r4ETexts[this.eTextNum]){
			this.eTextNum++;
		}
		if(this.eTextNum === s4r4ETexts.length){
			this.eTextNum = 0;
			this.showEtext = false;
			this.dialog = false;
			this.eTextDelay = this.time.addEvent({delay: 1000, callback: this.allowEventText, callbackScope: this, loop: false});
			this.textCycling = false;
		}
	}
	allowEventText(){
		this.showEtext = true;
	}
	
	startBattle(){
		if(!Stage4r4Clear && !this.textCycling && !this.textActive){
			currentEnemy = 'GangLeader';
			lastStage = 'Stage4r4';
			this.scene.start('Battle');
		}
	}
	
	//used to go through text arrays
	cycleText(textIndex, textsArr){
		if(textIndex < textsArr.length){
			this.textCycling = true;
			if((this.currentTexttemp = this.worldText(textsArr[textIndex])) !== ' '){
				this.currentText = this.currentTexttemp;
			}
		}
		else{
			this.textCycling = false;
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
