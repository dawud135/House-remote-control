(function(window){
	
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	window.Code.Door = function(id){
			var _id = id;

			this.OPEN = 1;
			this.CLOSE = 0;
			var _status = this.CLOSE;

			this.open = function() {
				alert(_id + ' opened ');
				_status = this.OPEN;
			}

			this.close = function() {
				alert(_id + ' closed ');
				_status = this.CLOSE;
			}

			this.getStatus = function() {
				return _status;
			}

			this.getId = function() {
				return _id;
			}
	};

}(window));
