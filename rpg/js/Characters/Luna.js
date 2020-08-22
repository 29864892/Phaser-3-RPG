//luna skills
function Luna(){
	
	skill1DesL = 'While health is greater than 50%, has a\nchance deal increased damage';
	skill2DesL = 'Passive: If health < 50%, increase\narmor by 25% and heal 10% of max health';
	skill3DesL = 'Deal a Large Amount of Damage.';
	damage = 0;
	s3Cd = 4;
	
	this.Skill1 = function(currChar){
		if(currChar.health >= 50){
			damage = Phaser.Math.Between(60, 120);
		}
		else{
			damage = Phaser.Math.Between(40, 100);
		}
		return damage;
	}
	
	this.Skill2 = function(currChar){
		if(currChar.health < 50){
			currChar.armor = 25;
			currChar.health += 10;
		}
		else{
			currChar.armor = 0;
		}
	}
	
	this.Skill3 = function(){
		let damage = Phaser.Math.Between(150, 300);
		return damage;
	}
	
	Object.defineProperty(this, 'skill1DesL', {
		get: function(){
			return skill1DesL;
		}
	});
	
	Object.defineProperty(this, 'skill2DesL', {
		get: function(){
			return skill2DesL;
		}
	});
	
	Object.defineProperty(this, 'skill3DesL', {
		get: function(){
			return skill3DesL;
		}
	});
	
	Object.defineProperty(this, 's3Cd', {
		get: function(){
			return s3Cd;
		}
	});
}

function LunaAnims(scene){
	scene.anims.create({//animation for moving left
			key: 'LunaIdle',
			frames: scene.anims.generateFrameNumbers('LunaSprite', { start: 0, end: 1 }),
			frameRate: 1,
			repeat: -1
		});
		
}