function Officer(){
	
	skill1DesE = 'took aim, increasing attack!';
	skill2DesE = 'used military knife!';
	skill3DesE = 'Calls in an air strike!';
	damage = 0;
	
	this.skill1 = function(officerObject, ally){
		officerObject.attack += 15;
	}
	
	this.skill2 = function(officerObject, ally){
		ally.health -= (officerObject.attack/2 - ally.armor);
	}
	
	this.skill3 = function(officerObject, ally){
		ally.health -= (officerObject.attack - ally.armor);
	}
	
	Object.defineProperty(this, 'skill1DesE', {
		get: function(){
			return skill1DesE;
		}
	});
	
	Object.defineProperty(this, 'skill2DesE', {
		get: function(){
			return skill2DesE;
		}
	});
	
	Object.defineProperty(this, 'skill3DesE', {
		get: function(){
			return skill3DesE;
		}
	});
}

function OfficerAnims(scene){
	scene.anims.create({//animation for moving left
			key: 'OfficerIdle',
			frames: scene.anims.generateFrameNumbers('officer', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
		
}