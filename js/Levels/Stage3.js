let playerFinalXS3 = 0;
let playerFinalYS3 = 0;
let initialConvRead = false;
let officerDefeated = false;
let s3Clear = false;

class Stage3 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage3',
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
		this.load.tilemapTiledJSON('map3', 'assets/stage3/Stage3e.json');
		this.load.spritesheet('tiles3', 'assets/stage3/stage3tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		if(playerFinalXS3 === 0 && playerFinalYS3 === 0){
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
		
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map3'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage3tiles','tiles3');
		this.grassLayer = this.map.createStaticLayer('grass', this.tiles, 0, 0);
		this.trees = this.map.createStaticLayer('trees', this.tiles, 0, 0);
		this.water = this.map.createStaticLayer('water', this.tiles, 0, 0);
		this.water.setCollisionByExclusion([-1]);
		this.trees.setCollisionByExclusion([-1]);
		this.prompt = this.physics.add.staticImage(130, 300, 'borderv');
		this.prompt.visible = false;
		this.createShip();
		this.createSoldiers();
		this.luna = this.physics.add.staticImage(360, 400, 'Luna2d');
		this.createConv();
		this.createChoices();
	}
	createShip(){
		this.fire = this.physics.add.sprite(160, 40, 'fire');
		this.fire.body.setAllowGravity(false);
		this.ship = this.physics.add.staticImage(100, 120, 'ship');
		this.anims.create({
		key: 'burn',
			frames: this.anims.generateFrameNumbers('fire',  { start: 0, end: 1 }),
			frameRate: 10,
			repeat: -1
		});
		this.fire.anims.play('burn');
	}
	createSoldiers(){
		if(!s3Clear){
			this.army = this.physics.add.staticGroup({
				key: 'soldier',
				allowGravity: false,
				repeat: 3,
				setXY: {x: 300, y: 250, stepX: 40 }
			});
			if(!officerDefeated){
				this.leader = this.physics.add.staticImage(360, 300, 'captain');
			}
			this.soldiersDestroyed = false;
		}
	}
	createConv(){
		this.currentText = ' ';
		this.dialog = true;
		this.textNum = 0;
		//see gameText.js
		this.texts = [s3text1, s3text2, s3text3, s3text4, s3text5, s3text6, s3text7, s3text8, s3text9, s3text10, s3text11, s3text12, s3text13, s3text14];
		this.choice1texts = [s3c1Text1, s3c1Text2, s3c1Text3];
		this.choice2texts = [s3c2Text1, s3c2Text2, s3c2Text3];
		this.choice3texts = [s3c3Text1, s3c3Text2, s3c3Text3];
		this.choice1textsNum = 0;
		this.choice2textsNum = 0;
		this.choice3textsNum = 0;
		this.victoryTexts = [s3VText1, s3VText2, s3VText3, s3VText4, s3VText5, s3VText6, s3VText7, s3VText8, s3VText9, s3VText10, s3VText11, s3VText12];
		this.vTextNum = 0;
	}
	createChoices(){
		this.dialogFinished = false;
		this.choicesVisible = true;
		this.choose = false;
		this.choice = 0;// 1 2 or 3 
		this.createChoice1();
		this.createChoice2();
		this.createChoice3();
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
		this.choice1Text1 = this.add.text(100, 90, 'Help the Mysterious Person' ,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
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
		this.choice1Text2 = this.add.text(100, 290, 'Watch the fight' ,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
	}
	confirm2(){
		this.choice = 2;
		this.choose = false;
		this.toggleChoices();
	}
	
	createChoice3(){
		this.choice1BoxS3 = this.add.image(400, 500, 'optionS');
		this.choice1BoxS3.visible = false;
		this.choice1Box3 = this.add.image(400, 500, 'option');
		this.choice1Box3.setInteractive();
		this.choice1Box3.on('pointerover', () => this.hoverSelection3());
		this.choice1Box3.on('pointerout', () => this.hideSelection3());
		this.choice1Box3.on('pointerdown', () => this.confirm3());
		this.choice1Text3 = this.add.text(100, 490, 'Leave' ,{ fontSize: '30px', fill: '#001', fontFamily: 'Arial' });
	}
	confirm3(){
		this.choice = 3;
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
	hoverSelection3(){
		this.choice1BoxS3.visible = true;
	}
	hideSelection3(){
		this.choice1BoxS3.visible = false;
	}
	
	toggleChoices(){
		if(this.choice1Box.input.enabled){
			this.choice1Box.visible = false;
			this.choice1Text1.visible = false;
			this.choice1Box.input.enabled = false;
			
			this.choice1Box2.input.enabled = false;
			this.choice1Box2.visible = false;
			this.choice1Text2.visible = false;
	
			this.choice1Box3.input.enabled = false;
			this.choice1Box3.visible = false;
			this.choice1Text3.visible = false;
			
			this.choicesVisible = false;
		}
		else{
			this.choice1Box.visible = true;
			this.choice1Text1.visible = true;
			this.choice1Box.input.enabled = true;
			
			this.choice1Box2.visible = true;
			this.choice1Text2.visible = true;
			this.choice1Box2.input.enabled = true;
			
			this.choice1Box3.visible = true;
			this.choice1Text3.visible = true;
			this.choice1Box3.input.enabled = true;
			
			this.choicesVisible = true;
		}
	}
	createExit(){
		this.lakeExit = this.physics.add.staticImage(800, 300, 'borderv');
		this.lakeExit.visible = false;
	}
	
	PlayerInteractions(){
		this.physics.add.collider(this.trees, this.player1);
		this.physics.add.collider(this.water, this.player1);
		this.physics.add.collider(this.luna, this.player1);
		this.physics.add.overlap(this.lakeExit, this.player1, this.enter2r1, null, this);
	}
	enter2r1(){
		playerFinalXS3 = this.player1.x - 10;
		playerFinalYS3 = this.player1.y;
		this.scene.start('Stage2r1');
	}
	
	
	update(){
		if(!this.textActive && !this.choose && !this.choice1Box.input.enabled){
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
		if(this.dialog && !initialConvRead && !officerDefeated){
			this.cycleText(this.textNum, this.texts);
			this.checkTextMain();
		}
		if(!officerDefeated){
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
			if((this.currentTexttemp = this.worldText(textsArr[textIndex])) !== ' '){
				this.currentText = this.currentTexttemp;
			}
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
		if((this.choice === 0 && !this.choicesVisible && this.choose)||(initialConvRead && !this.choicesVisible && this.choice === 0)){
			this.toggleChoices();
			this.choicesVisible = true;
		}
	}
	
	evaluateChoice(){
		if(!this.dialogFinished){
			if(this.choice === 1){
				this.cycleText(this.choice1textsNum, this.choice1texts);
				this.checkTextC1();
			}
			else if(this.choice === 2){
				this.cycleText(this.choice2textsNum, this.choice2texts);
				this.checkTextC2();
			}
			else if(this.choice === 3){
				this.cycleText(this.choice3textsNum, this.choice3texts);
				this.checkTextC3();
			}
		}
		else{
			if(this.choice === 1 || this.choice === 2){
				console.log('start battle');
				currentEnemy = 'Officer';
				lastStage = 'Stage3';
				this.scene.start('Battle');
			}
			if(this.choice === 3){
				initialConvRead = true;
				this.scene.start('Stage2r1');
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
	checkTextC3(){
		if(!this.textActive && this.currentText === this.choice3texts[this.choice3textsNum]){
				this.choice3textsNum++;
		}
		else if(this.choice3textsNum === this.choice3texts.length){
			this.dialogFinished = true;
		}
	}
	
	postBattle(){
		if(!this.dialogFinished && !s3Clear){
			this.cycleText(this.vTextNum, this.victoryTexts);
			if(this.vTextNum === 2){
				this.player1.x = 360;
				this.player1.y = 360;
				this.playerProperties.defaultDir = 'down';
				this.startMoving = false;
			}
			if(this.vTextNum === 1 && !this.soldiersDestroyed){
				this.soldiersDestroyed = true;
				this.army.destroy(true);
			}
			this.checkVText();
		}
		else{//be able to interact with character after text
			this.interactionL = CanInteract(this.player1, this.luna, 40);
			if(this.aButton.isDown && !this.textActive && this.createText && this.interactionL){
				this.worldText('Luna\nIf you aren\'t sure where to go, we could start \nwith the town north of here.');
			}
		}
	}
	checkVText(){
		if(!this.textActive && this.currentText === this.victoryTexts[this.vTextNum]){
				this.vTextNum++;
		}
		else if(this.vTextNum === this.victoryTexts.length){
			this.dialogFinished = true;
			s3Clear = true;
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