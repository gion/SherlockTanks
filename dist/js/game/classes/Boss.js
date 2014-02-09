//Boss class, extends Enemy and implements a special action function
var Boss = function(settings){
	_.extend(this, settings);
	Enemy.apply(this, arguments);
};

Boss.prototype = new Enemy(null);
Boss.prototype.constructor = Boss;
Boss.prototype.usingSpecial = false;
Boss.prototype.special = function(){
	this.usingSpecial = true;
	var currentSpeed = this.speed;
	this.speed = 7;
	var boss = this;
	setTimeout(function(){
		boss.usingSpecial = false;
		boss.speed = currentSpeed;
	}, 1000)
}

// Overwrite & use the Enemy update function, along with the special ability mod.
Boss.prototype.update = function(vector, ground){
	Enemy.prototype.update.apply(this, arguments);

	if(this.usingSpecial == false){
		this.velocity.y = 0;
		this.velocity.x = 0;
	} else {
		this.velocity.y = -vector.y;
		this.velocity.y -= 1.5;
	}
}
