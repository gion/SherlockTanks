Game.directive("fmObstacle", function(){
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
				$scope.settings = new Obstacle(defaults);
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