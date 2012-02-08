(function(window){
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	//this class should implement an interface of command
	// interface Command {
	//    function execute();
	//    function undo();	
	// }
	window.Code.CeilingFanMediumCommand = function(ceilingFan){
		var _ceilingFan = ceilingFan;
		var _prevSpeed;

		this.execute = function () {
			_prevSpeed = _ceilingFan.getSpeed();
			_ceilingFan.medium();
		};

		this.undo = function () {
			if (_prevSpeed === _ceilingFan.HIGH) {
				_ceilingFan.high();
			} else if (_prevSpeed === _ceilingFan.MEDIUM) {
				_ceilingFan.medium();
			} else if(_prevSpeed === _ceilingFan.LOW) {
				_ceilingFan.low();
			} else {
				_ceilingFan.off();
			}
		};
	}
}(window));
