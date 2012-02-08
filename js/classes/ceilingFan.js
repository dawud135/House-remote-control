(function(window){
	
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	window.Code.CeilingFan = function(id){
			var _id = id;

			this.HIGH = 3;
			this.MEDIUM = 2;
			this.LOW = 1;
			this.OFF = 0;

			var _speed = this.OFF;

			this.high = function() {
				alert(_id + ' speed is turned high');
				_speed = this.HIGH;
			}

			this.medium = function() {
				alert(_id + ' speed is turned medium');
				_speed = this.MEDIUM;
			}

			this.low = function() {
				alert(_id + ' speed is turned low');
				_speed = this.LOW;
			}

			this.off = function() {
				alert(_id + ' speed is turned off');
				_speed = this.OFF;
			}

			this.getSpeed = function() {
				return _speed;
			}

			this.getId = function() {
				return _id;
			}
	};

}(window));
