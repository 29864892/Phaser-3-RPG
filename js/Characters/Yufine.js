//Yufine skills
function Yufine(){
	
	skill1DesY = 'Deal damage and increase the damage \ndealt by this skill by 5%';
	skill2DesY = 'Increase armor by 50 for one turn.';
	skill3DesY = 'Deal a Large Amount of Damage \nCooldown: 4 turns';
	damage = 0;
	damageBoost = 1;
	s3CdY = 4;
	
	this.Skill1 = function(){
		damage = Phaser.Math.Between(80, 100);
		damage += damage * (damageBoost * .05);
		damage = Math.floor(damage);
		damageBoost++;
		return damage;
	}
	
	this.Skill2 = function(charObject){
		charObject.armor = 50;
		return 0;
	}
	
	this.Skill3 = function(){
		let damage = Phaser.Math.Between(150, 300);
		return damage;
	}
	
	Object.defineProperty(this, 'skill1DesY', {
		get: function(){
			return skill1DesY;
		}
	});
	
	Object.defineProperty(this, 'skill2DesY', {
		get: function(){
			return skill2DesY;
		}
	});
	
	Object.defineProperty(this, 'skill3DesY', {
		get: function(){
			return skill3DesY;
		}
	});
	
	Object.defineProperty(this, 's3CdY', {
		get: function(){
			return s3CdY;
		}
	});
	
}

function YufineAnims(scene){
	scene.anims.create({//animation for moving left
			key: 'YufineIdle',
			frames: scene.anims.generateFrameNumbers('YufineSprite', { start: 0, end: 1 }),
			frameRate: 1,
			repeat: -1
		});
		
}