
class Stage4-2 extends Phaser.Scene{
	constructor(){
		super({key: 'Stage4-2',
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
		this.load.tilemapTiledJSON('map4', 'assets/stage4/stage4-1b.json');
		this.load.spritesheet('tiles4', 'assets/stage4/stage4Tiles.png', {frameWidth: 40, frameHeight: 40});
	}
	
	create(){
		this.GenerateMap();
		if(playerFinalXS4 === 0 && playerFinalYS4 === 0){
			createPlayer(this, 420, 540);//initial player and playerProperties objects
		}
		else{
			createPlayer(this, playerFinalXS4, playerFinalYS4);
		}
		if(this.player1.y >= 540){
			this.playerProperties.defaultDir = 'up';
		}
		else if(this.player1.x > 500){
			this.playerProperties.defaultDir = 'down';
		}
		this.startMoving = false;
		createPlayerAnims(this);//Create animations for the scene
		this.PlayerInteractions();
		KeyboardInteractions(this);
	}
	
	
	
	GenerateMap(){
		this.map = this.make.tilemap({key: 'map4'});
		//tileset = map.addTilesetImage('tilesetNameInTiled', 'tilesetNameInPhaser');
		this.tiles =  this.map.addTilesetImage('stage4tiles','tiles4');
		this.roadLayer = this.map.createStaticLayer('ground', this.tiles, 0, 0);
		this.buildingLayer2 = this.map.createStaticLayer('houseInside', this.tiles, 0, 0);
		this.buildingLayer = this.map.createStaticLayer('houses', this.tiles, 0, 0);
		this.buildingLayer.setCollisionByExclusion([-1]);
		this.walls = this.map.createStaticLayer('wall', this.tiles, 0, 0);
		this.walls.setCollisionByExclusion([-1]);
		this.doorLayer = this.map.createDynamicLayer('doors', this.tiles, 0, 0);
		this.createDoors();
		this.createExit();
	}
	//replace tile doors with sprite doors
	createDoors(){
		this.doorX = 0;
		this.doorY = 0;
		this.getDoorXY();
		this.door1 = this.physics.add.sprite(this.doorX, this.doorY, 'door4');
		this.door1.body.setAllowGravity(false);
		this.getDoorXY();
		this.door2 = this.physics.add.sprite(this.doorX, this.doorY, 'door4');
		this.door2.body.setAllowGravity(false);
		this.getDoorXY();
		this.door3 = this.physics.add.sprite(this.doorX, this.doorY, 'door4');
		this.door3.body.setAllowGravity(false);
	}
	getDoorXY(){
		let removed = false;
		this.doorLayer.forEachTile(tile => {
			//console.log(tile.index);
			if(tile.index === 32 && !removed){
				this.doorX = tile.getCenterX();
				this.doorY = tile.getCenterY();
				this.doorLayer.removeTileAt(tile.x, tile.y);
				removed = true;
			}
		})
	}
	createExit(){
		this.exit = this.physics.add.staticImage(400, 590, 'borderh');
		this.exit.visible = false;
	}
	
	PlayerInteractions(){
		this.buildingLayer.setCollisionByExclusion([-1]);//https://photonstorm.github.io/phaser3-docs/Phaser.Tilemaps.Tilemap.html
		this.physics.add.collider(this.buildingLayer, this.player1);
		this.physics.add.collider(this.walls, this.player1);
		//this.physics.add.overlap(this.door1, this.player1, this.enter1, null, this);
		this.physics.add.overlap(this.door2, this.player1, this.enter2, null, this);
		this.physics.add.overlap(this.door3, this.player1, this.enter3, null, this);
		this.physics.add.overlap(this.exit, this.player1, this.enter4, null, this);
	}
	//Enter houses
	/*enter1(){
		playerFinalXS4 = this.player1.x;
		playerFinalYS4 = this.player1.y;
		this.scene.start('Stage1s1');
	}*/
	enter2(){
		playerFinalXS4 = this.player1.x;
		playerFinalYS4 = this.player1.y + 5;
		this.scene.start('Stage4s1');
	}
	enter3(){
		playerFinalXS4 = this.player1.x;
		playerFinalYS4 = this.player1.y + 5;
		this.scene.start('Stage4s2');
	}
	//leave town
	enter4(){
		playerFinalXS4 = this.player1.x;
		playerFinalYS4 = this.player1.y - 5;
		this.scene.start('Stage2r2');
	}
	update(){
		//console.log(this.player1.x + ' ' + this.player1.y);
		if((this.player1.body.velocity.x !== 0 || this.player1.body.velocity.y !== 0) && !this.startMoving){
				this.startMoving = true;
		}
		updatePlayerMovement(this);
	}
}
