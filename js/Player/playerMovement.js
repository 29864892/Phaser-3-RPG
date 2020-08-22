//player movement functions
	function updatePlayerMovement(scene){
		scene.currentAnim = scene.playerProperties.playerMovement(scene.cursor.left.isDown, scene.cursor.right.isDown, scene.cursor.up.isDown, scene.cursor.down.isDown);
		if(!scene.startMoving){
			scene.currentDir = scene.playerProperties.currentDirection(true);
		}
		else{ 
			scene.currentDir = scene.playerProperties.currentDirection(false);
		}
		scene.player1.setVelocityX(scene.playerProperties.velocityX);
		scene.player1.setVelocityY(scene.playerProperties.velocityY);
		if(scene.spaceBar.isDown){
			scene.player1.setVelocityX(scene.playerProperties.velocityX*2);
			scene.player1.setVelocityY(scene.playerProperties.velocityY*2);
		}
		if(!scene.anims.isPlaying){
			if(scene.currentAnim === 'stop'){
				scene.player1.anims.play('stop' + scene.currentDir, true);
			}
			else{
				scene.player1.anims.play(scene.currentAnim, true);
			}
		}
	}
	
	function CanInteract(player, npc, minDistance){
		if((Math.abs(npc.x - player.x) <= minDistance) && (Math.abs(npc.y - player.y) <= minDistance)){
			return true;
		}
		else{
			return false;
		}
	}
	
	function KeyboardInteractions(scene){
		scene.cursor = scene.input.keyboard.createCursorKeys();
		scene.spaceBar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		scene.aButton = scene.input.keyboard.addKey('A');
		scene.start = false;
		scene.inputDelayStarted = false;
	}