(function(window){
	
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	window.Code.Light = function(id){
			var _id = id;

			this.ON = "ON";
			this.OFF = "OFF";
			var _status = this.OFF;

			this.on = function() {
				alert(_id + ' turned on');
				_status = this.ON;
			}

			this.off = function() {
				alert(_id + ' turned off');
				_status = this.OFF;
			}

			this.getStatus = function() {
				return _status;
			}

			this.getId = function() {
				return _id;
			}
	};

}(window));
