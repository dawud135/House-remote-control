(function(window){
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	//this class should implement an interface of command
	// interface Command {
	//    function execute();
	//    function undo();	
	// }
	window.Code.DoorOpenCommand = function(door){
		var _door = door;

		this.execute = function () {
			_door.open();
		};

		this.undo = function () {
			_door.close();
		};
	}
}(window));
