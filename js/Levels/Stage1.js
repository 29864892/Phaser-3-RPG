//Remember player position before switching scenes
let playerFinalXS1 = 0;
let playerFinalYS1 = 0;
class Stage1 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage1',
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
		this.load.tilemapTiledJSON('map1', 'assets/stage1/stage1.json');
		this.load.spritesheet('tiles1', 'assets/stage1/stage1Tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	
	create(){
		this.GenerateMap();
		if(playerFinalXS1 === 0 && playerFinalYS1 === 0){
			createPlayer(this, 225, 540);//initial player and playerProperties objects
		}
		else{
			createPlayer(this, playerFinalXS1, playerFinalYS1+5);
		}
		this.playerProperties.defaultDir = 'down';
		this.startMoving = false;
		createPlayerAnims(this);//Create animations for the scene
		this.PlayerInteractions();
		KeyboardInteractions(this);
	}
	
	update(){
		if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
		}
		updatePlayerMovement(this);
	}
	
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map1'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage1Tiles','tiles1');
		this.grassLayer = this.map.createStaticLayer('grass', this.tiles, 0, 0);
		this.roadLayer = this.map.createStaticLayer('road', this.tiles, 0, 0);
		this.buildingLayer = this.map.createStaticLayer('Buildings', this.tiles, 0, 0);
		this.buildingLayer.setCollisionByExclusion([-1]);
		this.doorLayer = this.map.createDynamicLayer('doors', this.tiles, 0, 0);
		this.createDoors();
		this.createExit();
	}
	//replace tile doors with sprite doors
	createDoors(){
		this.doorX = 0;
		this.doorY = 0;
		this.getDoorXY();
		this.door1 = this.physics.add.sprite(this.doorX, this.doorY, 'door');
		this.door1.body.setAllowGravity(false);
		this.getDoorXY();
		this.door2 = this.physics.add.sprite(this.doorX, this.doorY, 'door');
		this.door2.body.setAllowGravity(false);
		this.getDoorXY();
		this.door3 = this.physics.add.sprite(this.doorX, this.doorY, 'door');
		this.door3.body.setAllowGravity(false);
	}
	getDoorXY(){
		let removed = false;
		this.doorLayer.forEachTile(tile => {
			//console.log(tile.index);
			if(tile.index === 1 && !removed){
				this.doorX = tile.getCenterX();
				this.doorY = tile.getCenterY();
				this.doorLayer.removeTileAt(tile.x, tile.y);
				removed = true;
			}
		})
	}
	createExit(){
		this.exit = this.physics.add.staticImage(660, 20, 'exit');
		this.exit.visible = false;
	}
	
	PlayerInteractions(){
		this.buildingLayer.setCollisionByExclusion([-1]);//https://photonstorm.github.io/phaser3-docs/Phaser.Tilemaps.Tilemap.html
		this.physics.add.collider(this.buildingLayer, this.player1);
		this.physics.add.overlap(this.door1, this.player1, this.enter1, null, this);
		this.physics.add.overlap(this.door2, this.player1, this.enter2, null, this);
		this.physics.add.overlap(this.door3, this.player1, this.enter3, null, this);
		this.physics.add.overlap(this.exit, this.player1, this.enter4, null, this);
	}
	//Enter houses
	enter1(){
		playerFinalXS1 = this.player1.x;
		playerFinalYS1 = this.player1.y;
		this.scene.start('Stage1s1');
	}
	enter2(){
		playerFinalXS1 = this.player1.x;
		playerFinalYS1 = this.player1.y;
		this.scene.start('Stage1s2');
	}
	enter3(){
		playerFinalXS1 = this.player1.x;
		playerFinalYS1 = this.player1.y;
		this.scene.start('Stage1s3');
	}
	//leave town
	enter4(){
		playerFinalXS1 = this.player1.x;
		playerFinalYS1 = this.player1.y;
		this.scene.start('Stage2');
	}
}

