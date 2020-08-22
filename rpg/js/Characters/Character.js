//Ally game object
function Character(cLevel, cName, chealth, ultCd, cArmor){
	
	this.level = cLevel;
	this.exp = 0;
	this.dead = false;
	this.health = chealth;
	this.armor = cArmor;
	this.name = cName;
	this.skill1 = {};
	this.skill1Des = '';
	this.isPassive1 = false;
	this.skill2 = {};
	this.isPassive2 = false;
	this.skill2Des = '';
	this.skill3 = {};
	this.isPassive3 = false;
	this.skill3Des = '';
	this.s3Cd = ultCd;
	this.attack = 20;
	
	//return true unless health <= 0 to signify character status
	this.isDead = function(){
		if(health <= 0){
			return true;
		}
		else{
			return false;
		}
	}
	
	this.getLevel = function(){
		return this.level;
	}
	this.getHealth = function(){
		return this.health;
	}
	this.getArmor = function(){
		return this.armor;
	}
	
	/*
	Object.defineProperty(this, 'level', {
		get: function(){
			return level;
		},
		set: function(value){
			level = value;
		}
	});
	
	Object.defineProperty(this, 'exp', {
		get: function(){
			return exp;
		},
		set: function(value){
			exp = value;
		}
	});
	
	Object.defineProperty(this, 'health', {
		get: function(){
			return health;
		},
		set: function(value){
			health = value;
		}
	});
	
	Object.defineProperty(this, 'name', {
		get: function(){
			return name;
		},
		set: function(value){
			name = value;
		}
	});
	
	Object.defineProperty(this, 'skill1', {
		get: function(){
			return skill1;
		},
		set: function(value){
			skill1 = value;
		}
	});
	
	Object.defineProperty(this, 'skill2', {
		get: function(){
			return skill2;
		},
		set: function(value){
			skill2 = value;
		}
	});
	
	Object.defineProperty(this, 'skill3', {
		get: function(){
			return skill3;
		},
		set: function(value){
			skill3 = value;
		}
	});
	
	Object.defineProperty(this, 'skill1Des', {
		get: function(){
			return skill1Des;
		},
		set: function(value){
			skill1Des = value;
		}
	});
	
	Object.defineProperty(this, 'skill2Des', {
		get: function(){
			return skill2Des;
		},
		set: function(value){
			skill2Des = value;
		}
	});
	
	Object.defineProperty(this, 'skill3Des', {
		get: function(){
			return skill3Des;
		},
		set: function(value){
			skill3Des = value;
		}
	});
	
	Object.defineProperty(this, 'armor', {
		get: function(){
			return armor;
		},
		set: function(value){
			armor = value;
		}
	});*/
}