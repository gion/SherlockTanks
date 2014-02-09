Game.directive("fmEnemy", function(){
	return {
		priority: 0,
		replace: true,
		templateUrl: "assets/templates/fmEnemy.html",
		transclude: false,
		scope: {

		},
		controller: ["$scope", "LoopService",function($scope, LoopService){
			$scope.initiate = function(attributes){
				var defaults = {};
				_.extend(defaults, attributes);
				$scope.settings = new Enemy(defaults);

				// Basic behavior for Enemy
				LoopService.add(function(){
					$scope.settings.walk($scope.settings.direction);
					return $scope.settings.collect;
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