//initialize the remote control
var remoteControl = null;


//load classes
require(["classes/light", "classes/ceilingFan", "classes/door",
		"classes/noCommand", "classes/lightOffCommand", "classes/lightOnCommand", 
		"classes/ceilingFanHighCommand", "classes/ceilingFanMediumCommand", "classes/ceilingFanOffCommand",
		"classes/doorOpenCommand", "classes/doorCloseCommand",
		"classes/macroCommand",
		"classes/remoteControl"], function(someModule){
				try {
					var nbRows = 7;
					remoteControl = new window.Code.RemoteControl(nbRows);

					//initialize the house component
					var frontLight = new window.Code.Light("Front Light");
					var backyardLight = new window.Code.Light("Backyard Light");
					var livingRoomCeilingFan = new window.Code.CeilingFan("Living Room Ceiling Fan");
					var garageDoor = new window.Code.Door("Garage Door");
					var garageLight = new window.Code.Light("Garage Light");

					//initialize the command
					var frontLightOffCommand = new window.Code.LightOffCommand(frontLight);
					var frontLightOnCommand = new window.Code.LightOnCommand(frontLight);

					var backyardLightOffCommand = new window.Code.LightOffCommand(backyardLight);
					var backyardLightOnCommand = new window.Code.LightOnCommand(backyardLight);

					var livingRoomCeilingFanHighCommand = new window.Code.CeilingFanHighCommand(livingRoomCeilingFan);
					var livingRoomCeilingFanMediumCommand = new window.Code.CeilingFanMediumCommand(livingRoomCeilingFan);
					var livingRoomCeilingFanOffCommand = new window.Code.CeilingFanOffCommand(livingRoomCeilingFan);

					var garageLightOffCommand = new window.Code.LightOffCommand(garageLight);
					var garageLightOnCommand = new window.Code.LightOnCommand(garageLight);

					var garageDoorOpenCommand = new window.Code.DoorOpenCommand(garageDoor);
					var garageDoorCloseCommand = new window.Code.DoorCloseCommand(garageDoor);

					var garageDoorOpenMacroCommand = new window.Code.MacroCommand( [garageDoorOpenCommand, garageLightOnCommand] );
					var garageDoorCloseMacroCommand = new window.Code.MacroCommand( [garageDoorCloseCommand, garageLightOffCommand] );

				
					//initilaze the remote control commands
					remoteControl.setCommand(0, frontLightOnCommand, frontLightOffCommand);
					remoteControl.setCommand(1, backyardLightOnCommand, backyardLightOffCommand);
					remoteControl.setCommand(2, livingRoomCeilingFanHighCommand, livingRoomCeilingFanOffCommand);
					remoteControl.setCommand(3, livingRoomCeilingFanMediumCommand, livingRoomCeilingFanOffCommand);
					remoteControl.setCommand(4, garageDoorOpenMacroCommand, garageDoorCloseMacroCommand);

				} catch(err) {
					alert(err);
				}

});
	

