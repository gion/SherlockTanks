/*Root class for all objects & characters in the World*/
var Entity = function(settings){
	if(_.isNull(settings) != true){
		World.entities.push(this);
	}
	this.velocity = {}
	this.velocity.x = 0;
	this.velocity.y = 0;
}

// Basic properties
Entity.prototype.x = 0;
Entity.prototype.y = 0;
Entity.prototype.width = 0;
Entity.prototype.height = 0;
Entity.prototype.collect = false; // When true, the entity is taken out of the World update function and no longer considered for collision tests

/*Update function runs on every tick, this should be overwritten in other classes based on entity behavior*/
Entity.prototype.update = function(vector, ground){
	this.x += this.velocity.x + vector.x;
	this.y += this.velocity.y;

	if(this.x<-this.width) this.collect = true;

	if(this.y+vector.y<ground){
		this.y+=vector.y
	} else {
		this.y = ground;
	}

	this.velocity.x = 0;
	this.velocity.y = 0;
}