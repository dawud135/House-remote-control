(function(window){
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	//this class should implement an interface of command
	// interface Command {
	//    function execute();
	//    function undo();	
	// }
	// this command do nothing
	window.Code.NoCommand = function(){
		this.execute = function () {
		};

		this.undo = function () {
		};
	}
}(window));
