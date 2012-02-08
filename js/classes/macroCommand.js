(function(window){
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	//this class should implement an interface of command
	// interface Command {
	//    function execute();
	//    function undo();	
	// }
	window.Code.MacroCommand = function(commands) {
		//this is an array of commands
		var _commands = commands;

		this.execute = function () {
			for(var i = 0, maxI = _commands.length; i < maxI; i += 1) {
				_commands[i].execute();
			}
		};

		this.undo = function () {
			for(var i = 0, maxI = _commands.length; i < maxI; i += 1) {
				_commands[i].undo();
			}
		};
	}
}(window));
