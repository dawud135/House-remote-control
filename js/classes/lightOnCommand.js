(function(window){
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	//this class should implement an interface of command
	// interface Command {
	//    function execute();
	//    function undo();	
	// }
	window.Code.LightOnCommand = function(light){
		var _light = light;

		this.execute = function () {
			_light.on();
		};

		this.undo = function () {
			_light.off();
		};
	}
}(window));
