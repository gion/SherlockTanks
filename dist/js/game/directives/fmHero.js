Game.directive("fmHero", function(){
	return {
		priority: 0,
		replace: true,
		templateUrl: "assets/templates/fmHero.html",
		transclude: false,
		scope: {

		},
		controller: ["$scope", "$timeout", "LoopService", function($scope, $timeout, LoopService){

			$scope.canJump = true;
			$scope.initiate = function(attributes){
				var defaults = {};
				_.extend(defaults, attributes);
				$scope.settings = new Hero(defaults);
				$scope.bindControls();
			};


			// Bind keyboard controls to our hero character.
			$scope.bindControls = function(){
				KeyboardJS.on("up", function(){
					if($scope.canJump){
						$scope.settings.jump();
					}
				}, function(){
					
				});

				// Only shoot once per keypress
				KeyboardJS.on("space", function(){
					$scope.settings.shoot();
				}, function(){
					$scope.settings.canShoot = true;
				});

				LoopService.add(function(){
					var keys = KeyboardJS.activeKeys();
					if(keys.indexOf("right")>-1){
						$scope.settings.walk(Character.RIGHT);
					} else if(keys.indexOf("left")>-1){
						$scope.settings.walk(Character.LEFT);
					}
					return $scope.settings.collect;
				});
			}

		}],
		link: function(scope, element, attributes){
			attributes.width = $(element).find(".hero").width();
			attributes.height = $(element).find(".hero").height();
			attributes.x = parseInt(attributes.x);
			attributes.y = parseInt(attributes.y);
			scope.initiate(attributes);
		}
	};
});