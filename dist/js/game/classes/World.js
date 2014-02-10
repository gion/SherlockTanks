// World base class
var World = function(settings){
	if(_.isNull(settings) == false){
		_.extend(this, settings);
	}
};
World.entities = [];
World.vector = {
	x:0,
	y:10
};
World.friction = 0.98;

// World update function
World.update = function(){
	var i=0;
	for(i;i<this.entities.length;i++){
		if(this.entities[i].collect){
			this.entities.splice(i,1);
			continue;
		}
		this.entities[i].update(this.vector, this.height);
		this.collide(this.entities[i]);
	}
}

World.collide = function(entity){	
	for(var i=0;i<World.entities.length;i++){
		if(this.entities[i]==entity){
			continue;
		}

		// Process collisions with bullets
		if(entity.shots && entity.shots.length && this.entities[i] instanceof Character){
			for(var j=0;j<entity.shots.length;j++){
				if(entity.shots[j].x>=this.entities[i].x
					&&	entity.shots[j].x<=this.entities[i].x+this.entities[i].width
					&&	entity.shots[j].y<=this.entities[i].y
					&&	entity.shots[j].y>=this.entities[i].y-this.entities[i].height){
						this.entities[i].hitPoints -= entity.damage;
						entity.shots[j].collect=true;
					}
				
			}
		}

		// TODO: use Box2D to handle collisions
		var collision = World.detectCollision(entity,this.entities[i]);
		if(entity.x<0){
			entity.x = 0;
			if(entity instanceof Enemy){
				entity.direction = -entity.direction;
			}
		}
		if(entity.x>this.width){
			entity.x = this.width-entity.width;
			if(entity instanceof Enemy){
				entity.direction = -entity.direction;
			}
		}
		// Handle collision reactions
		if(collision.touch == true){

			// The hero can only jump if on a surface
			if(entity instanceof Hero && entity.jumping==false){
				entity.canJump = true;
			}
			// The hero will lose hitPoints when touching an Enemy (this includes the Boss class, which extends Enemy)
			if(entity instanceof Hero && this.entities[i] instanceof Enemy){
				entity.hitPoints -= +this.entities[i].damage;
			} else if (entity instanceof Enemy && this.entities[i] instanceof Hero){
				this.entities[i].hitPoints -= +entity.damage;
			}
			// bottom collision
			if((collision.edges.right || collision.edges.left) && collision.edges.bottom && !collision.edges.top && entity.y<this.entities[i].y-this.entities[i].height+2*World.vector.y){
				if(entity.velocity.y>0) entity.velocity.y = 0;
				// Remain still if immobile property is set to true
				if(!entity.immobile) entity.y = this.entities[i].y - this.entities[i].height;
				continue;
			}
			// top collision
			if((collision.edges.right || collision.edges.left) && !collision.edges.bottom && collision.edges.top && entity.y<this.entities[i].y+entity.height+2*World.vector.y){
				if(entity.velocity>0) entity.velocity.y = 0;
				// Remain still if immobile property is set to true
				if(!entity.immobile) entity.y = this.entities[i].y + entity.height;
				// If our Hero hits his head, bring him back to ground
				if(entity instanceof Hero){
					entity.jumping = false;
				}
				continue;
			}
			// right collision
			if((collision.edges.right && !collision.edges.left) && (collision.edges.bottom || collision.edges.top) && entity.y>this.entities[i].y-this.entities[i].height+2*World.vector.y){
				entity.velocity.x = 0;
				// Remain still if immobile property is set to true
				if(!entity.immobile) entity.x = this.entities[i].x - entity.width;
				if(entity instanceof Enemy && (this.entities[i] instanceof Enemy || this.entities[i] instanceof Obstacle)){
					entity.direction = -entity.direction;
				}
				continue;
			}
			// left collision
			if((!collision.edges.right && collision.edges.left) && (collision.edges.bottom || collision.edges.top) && entity.y>this.entities[i].y-this.entities[i].height+2*World.vector.y){
				entity.velocity.x = 0;
				// Remain still if immobile property is set to true
				if(!entity.immobile) entity.x = this.entities[i].x + this.entities[i].width;

				// Change direction when enemies collide with obstacles or other enemies
				if(entity instanceof Enemy && (this.entities[i] instanceof Enemy || this.entities[i] instanceof Obstacle)){
					entity.direction = -entity.direction;
				}
				continue;
			}
		}
	}
};


// Collision detection
World.detectCollision = function(a, b){
	var aBounds = {
		left: a.x,
		right: a.x + a.width,
		bottom: a.y,
		top: a.y - a.height
	};
	var bBounds = {
		left: b.x,
		right: b.x + b.width,
		bottom: b.y,
		top: b.y - b.height
	};

	var edges = {
		top		: aBounds.top<=bBounds.bottom && aBounds.top>=bBounds.top, // Touches top edge
		bottom	: aBounds.bottom<=bBounds.bottom && aBounds.bottom>=bBounds.top, // Touches bottom edge
		left	: aBounds.left<=bBounds.right && aBounds.left>=bBounds.left, // Touches left edge
		right	: aBounds.right>=bBounds.left && aBounds.right<=bBounds.right // Touches right edge
	};

	var touch = ((edges.left || edges.right) && (edges.top || edges.bottom));

	// Return collision details
	return {
		"touch":touch,
		"edges":edges
	};
}