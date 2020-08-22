//player properties
function player(){
	//current player direction = true
	defaultDir = 'right';
	movingRight = false;
	movingLeft = false;
	movingUp = false;
	movingDown = false;
	velocityX = 0;
	velocityY = 0;
	//return direction and adjust player velocity based on input
	this.playerMovement = function(left, right, up, down){
		if (left){//move left
			movingRight = false;
			movingLeft = true;
			movingUp = false;
			movingDown = false;
			velocityX = -80;
			velocityY = 0;
			return 'left';
		}
		else if (right){
			movingRight = true;
			movingLeft = false;
			movingUp = false;
			movingDown = false;
			velocityX = 80;
			velocityY = 0;
			return 'right';
		}
		else if (up){//up
			movingRight = false;
			movingLeft = false;
			movingUp = true;
			movingDown = false;
			velocityX = 0;
			velocityY = -80;
			return 'up';
		}
		else if(down){//down
			movingRight = false;
			movingLeft = false;
			movingUp = false;
			movingDown = true;
			velocityX = 0;
			velocityY = 80;
			return 'down';
		}
		else{
			velocityX = 0;
			velocityY = 0;
			return 'stop';
		}
	}
	
	this.currentDirection = function(isDefault){
		if(!isDefault){
			if(movingRight){
				return 'right';
			}
			else if(movingLeft){
				return 'left';
			}
			else if(movingUp){
				return 'up';
			}
			else if(movingDown){
				return 'down';
			}
			else{
				return '';
			}
		}
		else{
			return defaultDir;
		}
	}
	
	Object.defineProperty(this, 'movingRight', {
		get: function(){
			return movingRight;
		},
		set: function(value){
			movingRight = value;
		}
	});
	
	Object.defineProperty(this, 'movingLeft', {
		get: function(){
			return movingLeft;
		},
		set: function(value){
			movingLeft = value;
		}
	});
	
	Object.defineProperty(this, 'movingUp', {
		get: function(){
			return movingUp;
		},
		set: function(value){
			movingUp = value;
		}
	});
	
	Object.defineProperty(this, 'movingDown', {
		get: function(){
			return movingDown;
		},
		set: function(value){
			movingDown = value;
		}
	});
	
	Object.defineProperty(this, 'velocityX', {
		get: function(){
			return velocityX;
		},
		set: function(value){
			velocityX = value;
		}
	});
	
	Object.defineProperty(this, 'velocityY', {
		get: function(){
			return velocityY;
		},
		set: function(value){
			velocityY = value;
		}
	});
	
	Object.defineProperty(this, 'defaultDir', {
		get: function(){
			return defaultDir;
		},
		set: function(value){
			defaultDir = value;
		}
	});
}

