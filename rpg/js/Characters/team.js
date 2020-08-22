//object holding ally objects
function team(){
	Ally1 = {};
	Ally2 = {};
	Ally3 = {};
	numAllies = 0;
	
	Object.defineProperty(this, 'Ally1', {
		get: function(){
			return Ally1;
		},
		set: function(value){
			Ally1 = value;
		}
	});
	

	Object.defineProperty(this, 'Ally2', {
		get: function(){
			return Ally2;
		},
		set: function(value){
			Ally2 = value;
		}
	});
	
	Object.defineProperty(this, 'Ally3', {
		get: function(){
			return Ally3;
		},
		set: function(value){
			Ally3 = value;
		}
	});
	
	Object.defineProperty(this, 'numAllies', {
		get: function(){
			return numAllies;
		},
		set: function(value){
			numAllies = value;
		}
	});
}