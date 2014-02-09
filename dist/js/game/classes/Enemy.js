//Enemy class, extends Character
var Enemy = function(settings){
	_.extend(this, settings);
	Character.apply(this, arguments);
};

// Nothing special here, just setting a default direction to walk.
Enemy.prototype = new Character(null);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.direction = Character.LEFT;