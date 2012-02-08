(function(window){
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	if(typeof window.Code.Util === 'undefined') {
		window.Code.Util = {};
	}

	window.Code.Util.DebugConsole = function(el){
		var _el = el;

		this.info = function(message) {
			_el.innerHTML += '<div class="consoleInfo">' + message  + "</div>";
		}

		this.warning = function(message) {
			_el.innerHTML += '<div class="consoleWarning">' + message  + "</div>";
		}

		this.error = function(message) {
			_el.innerHTML += '<div  class="consoleError">' + message  + "</div>";
		}
	};

}(window));
