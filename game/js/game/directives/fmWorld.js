Game.directive("fmWorld", function(){
	return {
		priority: 0,
		replace: true,
		templateUrl: "assets/templates/fmWorld.html",
		transclude: false,
		scope: "@",
		controller: ["$scope", "$interval", "LoopService", function($scope, $interval, LoopService){
			$scope.initiate = function(attributes){
				World.width = attributes.width;
				World.height = attributes.height;
				LoopService.add(function(){
					var tick = World.update();
					return false;
				});
			}
		}],
		link: function(scope, element, attributes){
			attributes.width = element.width();
			attributes.height = element.height();
			scope.initiate(attributes);
		}
	};
});