//edgel0rd class
function Edgel0rd(){
	
	skill1DesE = 'used Edgy Stance, increasing attack!';
	skill2DesE = 'used Body Pillow Shield, increasing \narmor!';
	skill3DesE = 'Unleashes Deluded Despair!';
	damage = 0;
	
	this.skill1 = function(edgyObject, ally){
		edgyObject.attack += 10;
	}
	
	this.skill2 = function(edgyObject, ally){
		edgyObject.armor += 10;
	}
	
	this.skill3 = function(edgyObject, ally){
		ally.health -= (edgyObject.attack - ally.armor);
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

function edgeLordAnims(scene){
	scene.anims.create({//animation for moving left
			key: 'edgelordIdle',
			frames: scene.anims.generateFrameNumbers('boss1s1', { start: 0, end: 1 }),
			frameRate: 10,
			repeat: -1
		});
		
}