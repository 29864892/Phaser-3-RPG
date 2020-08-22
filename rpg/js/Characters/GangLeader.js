function GangLeader(){
	
	skill1DesE = 'flexed his expensive jewelry, \nincreasing attack!';
	skill2DesE = 'fired his pistols!';
	skill3DesE = 'calls in his personal firing \nsquad!';
	damage = 0;
	
	this.skill1 = function(gangObject, ally){
		gangObject.attack += 25;
	}
	
	this.skill2 = function(gangObject, ally){
		ally.health -= (gangObject.attack/2 - ally.armor);
	}
	
	this.skill3 = function(gangObject, ally){
		ally.health -= (gangObject.attack - ally.armor);
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

function gangAnims(scene){
	scene.anims.create({//animation for moving left
			key: 'gangIdle',
			frames: scene.anims.generateFrameNumbers('gangLeaderB', { start: 0, end: 1 }),
			frameRate: 5,
			repeat: -1
		});
		
}