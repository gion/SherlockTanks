//Hero class, extends Character
var Hero = function(settings){
	_.extend(this, settings);
	Character.apply(this, arguments);
};

Hero.prototype = new Character(null);
Hero.prototype.constructor = Hero;

Hero.prototype.canJump = true;
Hero.prototype.jumping = false;
Hero.prototype.canShoot = true;

Hero.prototype.shots = [];

Hero.prototype.jump = function(){
	// Bunny hopping strictly forbidden.
	var entity = this;
	var currentSpeed = this.speed;
	if(this.canJump == true && this.jumping==false){
		this.canJump = false;
		this.jumping = true;
		this.speed = 3;
		setTimeout(function(){
			entity.speed = currentSpeed;
			entity.jumping = false;
		}, 600);
	}
}

/*Our hero can shoot*/
Hero.prototype.shoot = function(){
	if(this.shots.length>3 || this.collect) return;
	if(this.canShoot){
		this.canShoot=false;
		this.shots.push({
			"x":this.x + ((this.direction==Character.RIGHT)?55:-40), // position near turret
			"y":this.y-this.height/2-14, //  position near turret
			"width":60,
			"height":10,
			"direction":this.direction,
			"collect":false
		});
	}
}

/*Custom hero update function that extends the basic Character update function*/
Hero.prototype.update = function(vector, ground){
	Character.prototype.update.apply(this, arguments);

	if(this.y==ground){
		this.canJump = true;
	}

	this.velocity.x = 0;
	if(this.jumping == false){
		this.velocity.y = 0;
	} else {
		this.velocity.y = -vector.y;
		this.velocity.y -= 6;
	}
}

// Animate the bullet's position based our Hero's orientation
Hero.prototype.fireBullet = function(bullet){
	var hero = this;
	if(bullet.direction == Character.RIGHT){
		TweenMax.to(bullet, 1.5,{
			x: "+=400",
			onComplete: function(){
				hero.shots.splice(hero.shots.indexOf(bullet),1);
			},
			onUpdate: function(){
				if(bullet.collect){
					hero.shots.splice(hero.shots.indexOf(bullet),1);
					this.kill();
				}
			}
		});
	} else {
		TweenMax.to(bullet, 1.5,{
			x: "-=400",
			onComplete: function(){
				hero.shots.splice(hero.shots.indexOf(bullet),1);
			},
			onUpdate: function(){
				if(bullet.collect){
					hero.shots.splice(hero.shots.indexOf(bullet),1);
					this.kill();
				}
			}
		});
	}
}