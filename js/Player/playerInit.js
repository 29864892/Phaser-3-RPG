//Player initialization
function createPlayerAnims(scene){
		scene.anims.create({//animation for moving left
			key: 'right',
			frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
			frameRate: 10,
			repeat: -1
		});
		
		scene.anims.create({//animation for moving left
			key: 'stopright',
			frames: [ { key: 'player', frame: 0 } ],
			frameRate: 20
		});
		
		scene.anims.create({//animation for moving left
			key: 'stop',
			frames: [ { key: 'player', frame: 0 } ],
			frameRate: 20
		});
		
		scene.anims.create({
		key: 'left',
			frames: scene.anims.generateFrameNumbers('player',  { start: 5, end: 9 }),
			frameRate: 10,
			repeat: -1
		});
		
		scene.anims.create({
		key: 'stopleft',
			frames:  [ { key: 'player', frame: 5 } ],
			frameRate: 10,
			repeat: -1
		});
		
		scene.anims.create({
		key: 'down',
			frames: scene.anims.generateFrameNumbers('player',  { start: 10, end: 14 }),
			frameRate: 10,
			repeat: -1
		});
		
		scene.anims.create({
		key: 'stopdown',
			frames:  [ { key: 'player', frame: 14 } ],
			frameRate: 10,
			repeat: -1
		});
		
		scene.anims.create({
		key: 'up',
			frames: scene.anims.generateFrameNumbers('player',  { start: 15, end: 19 }),
			frameRate: 10,
			repeat: -1
		});
		
		scene.anims.create({
		key: 'stopup',
			frames:  [ { key: 'player', frame: 15 } ],
			frameRate: 10,
			repeat: -1
		});
	}
	
function createPlayer(scene, pX, pY){
	scene.player1 = scene.physics.add.sprite(pX, pY, 'player');
	scene.player1.setCollideWorldBounds(true);
	scene.player1.body.setAllowGravity(false);
	scene.playerProperties = new player();
	scene.currentAnim = 'none';
	scene.currentDir = 'none';
}

function PlayerBattleAnims(scene){
	scene.anims.create({//animation for moving left
			key: 'PlayerIdle',
			frames: scene.anims.generateFrameNumbers('PlayerSprite', { start: 0, end: 1 }),
			frameRate: 1,
			repeat: -1
		});
		
}