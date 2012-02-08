(function(window){
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	//this class should implement an interface of command
	// interface Command {
	//    function execute();
	//    function undo();	
	// }
	window.Code.LightOffCommand = function(light){
		var _light = light;

		this.execute = function () {
			_light.off();
		};

		this.undo = function () {
			_light.on();
		};
	}
}(window));
