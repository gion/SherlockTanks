var Obstacle = function(settings){
	if(_.isNull(settings) == false){
		_.extend(this, settings);
		Entity.call(this);
	}
}

Obstacle.prototype = new Entity(null);
Obstacle.prototype.constructor = Obstacle;
Obstacle.prototype.immobile = true;

/*Obstacle update function that overwrites basic Entity update function*/
Obstacle.prototype.update = function(vector, ground){
	this.velocity.x = 0;
	this.velocity.y = 0;
}
