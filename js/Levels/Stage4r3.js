let playerFinalXS4r3 = 0;
let playerFinalYS4r3 = 0;
let s4r3Clear = false;
let s4r3Clear2 = false;
let s4r3SoldiersDefeated = false;
let s4r3VConv1Finished = false;
let initialConvRead4r3 = false;
class Stage4r3 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage4r3',
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
		this.load.tilemapTiledJSON('map4r3', 'assets/stage4/Stage4r3/stage4r3.json');
		this.load.spritesheet('tiles4r3', 'assets/stage4/stage4r3/stage4tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		if(playerFinalXS4r3 === 0 && playerFinalYS4r3 === 0){
			createPlayer(this, 754, 298);//initial player and playerProperties objects
		}
		else{
			createPlayer(this, playerFinalXS3, playerFinalYS3);
		}
		createPlayerAnims(this);//Create animations for the scene
		this.playerProperties.defaultDir = 'left';
		this.startMoving = false;
		this.createExit();
		this.PlayerInteractions();
		KeyboardInteractions(this);
		this.textActive = false;
		this.createText = true;
		this.clearTextBox = false;
		this.textCycling = false;
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map4r3'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage4tiles','tiles4r3');
		this.grassLayer = this.map.createStaticLayer('ground', this.tiles, 0, 0);
		this.wall = this.map.createStaticLayer('wall', this.tiles, 0, 0);
		//this.wall2 = this.map.createStaticLayer('Tile Layer 1', this.tiles, 0, 0);
		this.wall.setCollisionByExclusion([-1]);
		//this.prompt = this.physics.add.staticImage(130, 300, 'borderv');
		//this.prompt.visible = false;
		this.createNPCs();
		this.createConv();
		this.createChoices();
		this.tempBlock = this.physics.add.staticImage(400, 50, 'borderh');
		this.tempBlock.visible = false;
	}
	
	createNPCs(){
		if(!s4r3Clear){
			this.army = this.physics.add.staticGroup({
				key: 'soldier',
				allowGravity: false,
				repeat: 2,
				setXY: {x: 350, y: 250, stepX: 50 }
			});
			this.soldiersDestroyed = false;
		}
		this.woman = this.physics.add.staticImage(400, 300, 'womanF');
		if(s4r3SoldiersDefeated){
			this.luna = this.physics.add.staticImage(350, 350, 'Luna2d');
			this.physics.add.collider(this.player1, this.luna);
			this.soldier = this.physics.add.staticImage(350, 250, 'soldierF');
		}
		
	}
	createConv(){
		this.currentText = ' ';
		this.dialog = true;
		this.textNum = 0;
		//see gameText.js
		this.texts = [s4r3Text1, s4r3Text2, s4r3Text3];
		this.choice1texts = [s4r3Text5, s4r3Text6, s4r3Text7, s4r3Text7b];
		this.choice2texts = [s4r3Text8, s4r3Text9];
		this.choice1textsNum = 0;
		this.choice2textsNum = 0;
		this.vTextNum = 0;
		this.v2TextNum = 0;
		this.secondDialog = false;
		this.secondDialogActive = false;
	}
	createChoices(){
		this.dialogFinished = false;
		this.choicesVisible = true;
		this.choose = false;
		this.choice = 0;// 1 2 
		this.createChoice1();
		this.createChoice2();
		this.toggleChoices();
	}
	createChoice1(){
		this.choice1BoxS = this.add.image(400, 100, 'optionS');
		this.choice1BoxS.visible = false;
		this.choice1Box = this.add.image(400, 100, 'option');
		this.choice1Box.setInteractive();
		this.choice1Box.on('pointerover', () => this.hoverSelection1());
		this.choice1Box.on('pointerout', () => this.hideSelection1());
		this.choice1Box.on('pointerdown', () => this.confirm1());
		this.choice1Text1 = this.add.text(100, 90, 'Save the citizen' ,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
	}
	confirm1(){
		this.choice = 1;
		this.choose = false;
		this.toggleChoices();
	}
	
	createChoice2(){
		this.choice1BoxS2 = this.add.image(400, 300, 'optionS');
		this.choice1BoxS2.visible = false;
		this.choice1Box2 = this.add.image(400, 300, 'option');
		this.choice1Box2.setInteractive();
		this.choice1Box2.on('pointerover', () => this.hoverSelection2());
		this.choice1Box2.on('pointerout', () => this.hideSelection2());
		this.choice1Box2.on('pointerdown', () => this.confirm2());
		this.choice1Text2 = this.add.text(100, 290, 'Leave' ,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
	}
	confirm2(){
		this.choice = 2;
		this.choose = false;
		this.toggleChoices();
	}
	
	hoverSelection1(){
		this.choice1BoxS.visible = true;
	}
	hideSelection1(){
		this.choice1BoxS.visible = false;
	}
	hoverSelection2(){
		this.choice1BoxS2.visible = true;
	}
	hideSelection2(){
		this.choice1BoxS2.visible = false;
	}
	
	
	toggleChoices(){
		if(this.choice1Box.input.enabled){
			this.choice1Box.visible = false;
			this.choice1Text1.visible = false;
			this.choice1Box.input.enabled = false;
			
			this.choice1Box2.input.enabled = false;
			this.choice1Box2.visible = false;
			this.choice1Text2.visible = false;

			this.choicesVisible = false;
		}
		else{
			this.choice1Box.visible = true;
			this.choice1Text1.visible = true;
			this.choice1Box.input.enabled = true;
			
			this.choice1Box2.visible = true;
			this.choice1Text2.visible = true;
			this.choice1Box2.input.enabled = true;
			
			this.choicesVisible = true;
		}
	}
	createExit(){
		this.exit = this.physics.add.staticImage(800, 300, 'borderv');
		this.exit.visible = false;
	}
	
	PlayerInteractions(){
		this.physics.add.collider(this.wall, this.player1);
		this.physics.add.overlap(this.exit, this.player1, this.enter4r2, null, this);
		this.physics.add.overlap(this.tempBlock, this.player1, this.blockMessage, null, this);
		if(!s4r3SoldiersDefeated){
			this.physics.add.collider(this.army, this.player1);
		}
		else{
			this.physics.add.collider(this.soldier, this.player1);
			this.physics.add.collider(this.luna, this.player1);
		}
		this.physics.add.collider(this.woman, this.player1);
	}
	enter4r2(){
		playerFinalXS3 = this.player1.x - 10;
		playerFinalYS3 = this.player1.y;
		this.scene.start('Stage4r2');
	}
	blockMessage(){
		this.worldText('Luna:\nLet\'s go to the center of town first.');
		this.player1.y = this.player1.y + 10;
		this.startMoving = false;
		this.player1.anims.play('stopup');
	}
	
	update(){
		if(!this.textActive && !this.choose && !this.choice1Box.input.enabled && !this.textCycling){
			if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
			}
			updatePlayerMovement(this);
		}
		else{
			this.player1.body.setVelocityX(0);
			this.player1.body.setVelocityY(0);
		}
		if(this.textActive && this.aButton.isDown){
			this.clearText();
		}
		if(this.dialog && !initialConvRead4r3 && !s4r3SoldiersDefeated){
			this.cycleText(this.textNum, this.texts);
			this.checkTextMain();
		}
		if(!s4r3SoldiersDefeated){
			this.promptChoice();
			this.evaluateChoice();
		}
		else{
			this.postBattle();
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
	checkTextMain(){
		if(!this.textActive && this.currentText === this.texts[this.textNum]){
				this.textNum++;
		}
		else if(this.choice === 0 && this.textNum === this.texts.length){
			this.choose = true;
		}
	}
	
	promptChoice(){
		if((this.choice === 0 && !this.choicesVisible && this.choose)||(initialConvRead4r3 && !this.choicesVisible && this.choice === 0)){
			this.toggleChoices();
			this.choicesVisible = true;
		}
	}
	
	evaluateChoice(){
		if(!this.dialogFinished){
			if(this.choice === 1){
				this.luna = this.physics.add.staticImage(400, 350, 'Luna2d');
				this.physics.add.collider(this.player1, this.luna);
				this.cycleText(this.choice1textsNum, this.choice1texts);
				this.checkTextC1();
			}
			else if(this.choice === 2){
				this.cycleText(this.choice2textsNum, this.choice2texts);
				this.checkTextC2();
			}
		}
		else{
			if(this.choice === 1){
				currentEnemy = 'Soldier4r3';
				lastStage = 'Stage4r3';
				this.scene.start('Battle');
			}
			if(this.choice === 2){
				initialConvRead4r3 = true;
				this.scene.start('Stage4r2');
			}
		}
	}
	checkTextC1(){
		if(!this.textActive && this.currentText === this.choice1texts[this.choice1textsNum]){
				this.choice1textsNum++;
		}
		else if(this.choice1textsNum === this.choice1texts.length){
			this.dialogFinished = true;
		}
	}
	checkTextC2(){
		if(!this.textActive && this.currentText === this.choice2texts[this.choice2textsNum]){
				this.choice2textsNum++;
		}
		else if(this.choice2textsNum === this.choice2texts.length){
			this.dialogFinished = true;
		}
	}
	
	postBattle(){
		this.interactionL = CanInteract(this.player1, this.luna, 40);
		if(!this.dialogFinished && !s4r3VConv1Finished){
			this.cycleText(this.vTextNum, s4r3VTexts1);
			this.checkVText();
		}
		else if(!this.secondDialog && !s4r3Clear2){//be able to interact with character after text
			if(this.aButton.isDown && !this.textActive && this.createText && this.interactionL && !this.secondDialogActive){
				this.secondDialogActive = true;
			}
			if(this.secondDialogActive){
				this.cycleText(this.v2TextNum, s4r3VTexts2);
				this.checkV2Text();
			}
		}
		if(this.interactionL && s4r3Clear2){
			if(this.aButton.isDown && !this.textActive && this.createText){
				this.worldText('Luna:\nWe need to stop this...');
			}
		}
	}
	checkVText(){
		if(!this.textActive && this.currentText === s4r3VTexts1[this.vTextNum]){
				this.vTextNum++;
		}
		else if(this.vTextNum === s4r3VTexts1.length){
			this.dialogFinished = true;
			s4r3VConv1Finished = true;
		}
	}
	checkV2Text(){
		if(!this.textActive && this.currentText === s4r3VTexts2[this.v2TextNum]){
				this.v2TextNum++;
		}
		else if(this.v2TextNum === s4r3VTexts2.length){
			this.secondDialog = true;
			s4r3Clear2 = true;
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