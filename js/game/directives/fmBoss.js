Game.directive("fmBoss", function(){
	return {
		priority: 0,
		replace: true,
		templateUrl: "assets/templates/fmBoss.html",
		transclude: false,
		scope: {

		},
		controller: ["$scope", "LoopService",function($scope, LoopService){
			$scope.initiate = function(attributes){
				var defaults = {};
				_.extend(defaults, attributes);
				$scope.settings = new Boss(defaults);

				// Default enemy behavior, just like fmEnemy.js
				LoopService.add(function(){
					$scope.settings.walk($scope.settings.direction);
					return $scope.settings.collect;
				});


				// Custom behavior for Boss
				setInterval(function(){
					$scope.settings.special();
				}, 8000);
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