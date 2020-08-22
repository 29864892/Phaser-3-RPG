let playerFinalXS2 = 0;
let playerFinalYS2 = 0;
let s2Event = false;
class Stage2 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage2',
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
		this.load.tilemapTiledJSON('map2', 'assets/stage2/stage2.json');
		this.load.spritesheet('tiles2', 'assets/stage2/stage2tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	create(){
		this.GenerateMap();
		if(playerFinalXS2 === 0 && playerFinalYS2 === 0){
			createPlayer(this, 660, 530);//initial player and playerProperties objects
			this.playerProperties.defaultDir = 'up';
		}
		else{
			createPlayer(this, playerFinalXS2, playerFinalYS2);
			if(playerFinalXS2 < 100){
				this.playerProperties.defaultDir = 'right';
			}
			else{
				this.playerProperties.defaultDir = 'up';
			}
		}
		this.startMoving = false;
		createPlayerAnims(this);//Create animations for the scene
		this.PlayerInteractions();
		KeyboardInteractions(this);
		this.textActive = false;
		this.createText = true;
		this.clearTextBox = false;
	}
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map2'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage2tiles','tiles2');
		this.grassLayer = this.map.createStaticLayer('Tile Layer 1', this.tiles, 0, 0);
		this.trees = this.map.createStaticLayer('Trees', this.tiles, 0, 0);
		this.trees.setCollisionByExclusion([-1]);
		this.createExit();
		this.createNPCS();
	}
	createExit(){
		this.exit = this.physics.add.staticImage(660, 580, 'exit');
		this.exit.visible = false;
		this.lakeExit = this.physics.add.staticImage(0, 240, 'borderv');
		this.lakeExit.visible = false;
		this.nExit = this.physics.add.staticImage(350, 0, 'borderh');
		this.nExit.visible = false;
	}
	createNPCS(){
		if(!s2Event){
			this.gang = this.physics.add.staticGroup({
				key: 'gangster',
				allowGravity: false,
				repeat: 6,
				setXY: {x: 300, y: 60, stepX: 40 }
			});
			this.gangLeader = this.physics.add.staticImage(420, 136, 'gangster');
		}
		this.kid = this.physics.add.staticImage(660, 370, 'kid');
		this.messageK1 = true;
		this.helpBoard = this.physics.add.staticImage(180, 264, 'help');
		this.s2EventTextRead = false;
	}
	PlayerInteractions(){
		this.physics.add.collider(this.trees, this.player1);
		this.physics.add.overlap(this.exit, this.player1, this.enter1, null, this);
		this.physics.add.overlap(this.lakeExit, this.player1, this.enterLakeRoute, null, this);
		this.physics.add.overlap(this.nExit, this.player1, this.enterNorthRoute, null, this);
		if(!s2Event){
			this.gangCollider = this.physics.add.collider(this.gang, this.player1);
			this.gLeaderCollider = this.physics.add.collider(this.gangLeader, this.player1);
		}
		this.physics.add.collider(this.kid, this.player1);
		this.physics.add.collider(this.helpBoard, this.player1);
	}
	enter1(){
		playerFinalXS2 = this.player1.x;
		playerFinalYS2 = this.player1.y - 10;
		this.registry.events.off('changedata', undefined, undefined, false);
		this.registry.destroy();
		this.events.off();
		this.scene.start('Stage1');
	}
	enterLakeRoute(){
		playerFinalXS2 = this.player1.x + 10;
		playerFinalYS2 = this.player1.y;
		this.registry.events.off('changedata', undefined, undefined, false);
		this.registry.destroy();
		this.events.off();
		this.scene.start('Stage2r1');	
	}
	enterNorthRoute(){
		playerFinalXS2 = this.player1.x + 10;
		playerFinalYS2 = this.player1.y;
		this.registry.events.off('changedata', undefined, undefined, false);
		this.registry.destroy();
		this.events.off();
		this.scene.start('Stage2r2');
	}
	update(){
		if(!this.textActive){
			if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
			}
			updatePlayerMovement(this);
		}
		this.checkInteraction();
		if(officerDefeated && !s2Event){
			//clear path to town
			this.clearPathNorth();
		}
	}
	checkInteraction(){
		if(!s2Event){
			this.interactionG = CanInteract(this.player1, this.gangLeader, 40);
		}
		this.interactionK = CanInteract(this.player1, this.kid, 40);
		this.interactionH = CanInteract(this.player1, this.helpBoard, 40);
		if(this.aButton.isDown && !this.textActive && this.createText){
			//this.createText = true;
			if(!s2Event){
				if(this.interactionG){
					this.worldText('Our boss told us not to let anyone through until \nhe gets the money the town owes him. Scram!');
				}
				else if(this.interactionK){
					if(this.messageK1){
						this.worldText('My dad got beat up by the scary guys over \nthere. They dragged him into the town but refuse \nto let me see him!');
						this.messageK1 = false;
					}
					else{
						this.worldText('I hope he\'s alright...');
					}
				}
			}
			else{
				if(this.interactionK){
					this.worldText('Could you check on my dad?I\'m scared...');
				}
			}
			if(this.interactionH){
				this.worldText('\n\n	<-- Lost Lake');
			}
		}
		if(this.textActive && this.aButton.isDown){
			this.clearText();
		}
	}
	
	clearPathNorth(){
		if(!this.textActive && this.createText && !this.s2EventTextRead){
			this.worldText('Boys, the boss got what he wanted. \nWe\'re heading out!');
			this.s2EventTextRead = true;
		}
		if(!this.textActive){
			this.physics.world.removeCollider(this.gLeaderCollider);
			this.physics.world.removeCollider(this.gangCollider);
			this.gang.destroy(true);
			this.gangLeader.destroy();
			s2Event = true;
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