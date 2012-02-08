(function(window){
	
	if(typeof window.Code === 'undefined') {
		window.Code = {};
	}

	window.Code.RemoteControl = function(nbSlot){
			var _undoCommand;
			var _onCommands;
			var _offCommands;
			var _noCommand;

			//initial
			_noCommand = new window.Code.NoCommand();
			_onCommands = [];
			_offCommands = [];
			for(var i = 0; i < nbSlot; i += 1) {
				_onCommands[i] = _noCommand;
				_offCommands[i] = _noCommand;
			}
			_undoCommand = _noCommand;
			
			//methods
			this.setCommand = function (slot, onCommand, offCommand){
								if(slot >= 0 && slot < _onCommands.length) {
									_onCommands[slot] = onCommand;
									_offCommands[slot] = offCommand;
								}
							};

			this.onButtonWasPushed = function (slot) {
								if(slot >= 0 && slot < _onCommands.length) {
									var command = _onCommands[slot];
									command.execute();
									_undoCommand = command;
								}
							};			
			
			this.offButtonWasPushed = function (slot) {
								if(slot >= 0 && slot < _offCommands.length) {
									var command = _offCommands[slot];
									command.execute();
									_undoCommand = command;
								}
							};

			this.undoButtonWasPushed = function () {
								_undoCommand.undo();
								_undoCommand = _noCommand;
							};
	
	};

}(window));
