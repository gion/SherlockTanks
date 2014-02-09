Game.factory("LoopService", ["$interval", function($interval){

	var stack = [];

	// On each frame
	$interval(function(){
		_.each(stack, function(f,i){
			if(f() != false){
				stack.splice(i,1);
			}
		});
	}, 10);

	return {
		add: function(f){
			stack.push(f);
		}
	}
}]);