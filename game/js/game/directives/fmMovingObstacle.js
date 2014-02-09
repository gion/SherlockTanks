/*Uses base Obstacle class, but adds new behavior*/
Game.directive("fmMovingObstacle", function(){
	return {
		priority: 0,
		replace: true,
		templateUrl: "assets/templates/fmObstacle.html",
		transclude: false,
		scope: {

		},
		controller: ["$scope", "LoopService",function($scope, LoopService){
			$scope.initiate = function(attributes){
				var defaults = {};
				_.extend(defaults, attributes);
				// No separate class for a moving obstacle
				$scope.settings = new Obstacle(defaults);

				// but a special behavior for it
				TweenMax.to($scope.settings, parseInt($scope.settings.time), {
					y:"+="+$scope.settings.distance,
					yoyo: true,
					ease: Linear.easeNone,
					repeat:-1,	
					repeatDelay:1.5
				});
			}

		}],
		link: function(scope, element, attributes){
			attributes.width = element.width();
			attributes.height = element.height();
			attributes.x = parseInt(attributes.x);
			attributes.y = parseInt(attributes.y);
			scope.initiate(attributes);
		}
	};
});