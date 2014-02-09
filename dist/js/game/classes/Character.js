// Character base class
var Character = function(settings){
	if(_.isNull(settings) == false){
		_.extend(this, settings);
		Entity.apply(this, arguments);
	}
}
Character.LEFT = -1;
Character.RIGHT = 1;
Character.prototype = new Entity(null);
Character.prototype.constructor = Character;
Character.prototype.direction = Character.RIGHT;


// Character base attributes
Character.prototype.hitPoints = 100;
Character.prototype.speed = 0;

// Character base functions
Character.prototype.walk = function(direction){
	this.direction = direction;
	this.velocity.x = this.direction * (+this.speed);
};

Character.prototype.update = function(vector, ground){
	if(this.hitPoints<=0){
		this.collect = true;
	}
	Entity.prototype.update.apply(this, arguments);
}