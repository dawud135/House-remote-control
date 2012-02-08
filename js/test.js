//load classes
require(["qunit"], function(someModule){

});

require(["classes/light", "classes/ceilingFan", "classes/door",
		"classes/noCommand", "classes/lightOffCommand", "classes/lightOnCommand", 
		"classes/ceilingFanHighCommand", "classes/ceilingFanMediumCommand", "classes/ceilingFanOffCommand",
		"classes/doorOpenCommand", "classes/doorCloseCommand",
		"classes/macroCommand",
		"classes/remoteControl"], function(someModule){

});

function do_onload() {
try {
	var remoteControl = new window.Code.RemoteControl(7);

	//initialize the house component
	var frontLight = new window.Code.Light("Front Light");
	var backyardLight = new window.Code.Light("Backyard Light");
	var livingRoomCeilingFan = new window.Code.CeilingFan("Living Room");
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

	//initilazie the remote control commands
	remoteControl.setCommand(0, frontLightOnCommand, frontLightOffCommand);
	remoteControl.setCommand(1, backyardLightOnCommand, backyardLightOffCommand);
	remoteControl.setCommand(2, livingRoomCeilingFanHighCommand, livingRoomCeilingFanOffCommand);
	remoteControl.setCommand(3, livingRoomCeilingFanMediumCommand, livingRoomCeilingFanOffCommand);
	remoteControl.setCommand(4, garageDoorOpenMacroCommand, garageDoorCloseMacroCommand);

	//test
	module("garage");
	test("garage macro command", function() {
		equal( garageDoor.getStatus(), garageDoor.CLOSE, "garage door is off" );

		ok( remoteControl.onButtonWasPushed(4), "garage door is turned to open" );
		equal( garageDoor.getStatus(), garageDoor.OPEN, "garage door is open" );	
		equal( garageLight.getStatus(), garageLight.ON, "garage light is on" );	

		ok( remoteControl.offButtonWasPushed(4), "garage door is turned to off" );
		equal( garageDoor.getStatus(), garageDoor.CLOSE, "garage door is off" );	
		equal( garageLight.getStatus(), garageLight.OFF, "garage light is off" );	

		ok( remoteControl.undoButtonWasPushed(), "garage is turned back to open" );
		equal( garageDoor.getStatus(), garageDoor.OPEN, "garage door is open" );	
		equal( garageLight.getStatus(), garageLight.ON, "garage light is on" );	

		ok( remoteControl.undoButtonWasPushed(), "garage is turned back to open" );
		equal( garageDoor.getStatus(), garageDoor.OPEN, "garage door is open" );	
		equal( garageLight.getStatus(), garageLight.ON, "garage light is on" );	
	});

	module("ceiling fan");
	test("ceiling fan button", function() {
		equal( livingRoomCeilingFan.getSpeed(), livingRoomCeilingFan.OFF, "ceiling fan status is off" );

		ok( remoteControl.onButtonWasPushed(2), "ceiling fan speed is turned to high" );
		equal( livingRoomCeilingFan.getSpeed(), livingRoomCeilingFan.HIGH, "ceiling fan speed is high" );	

		ok( remoteControl.onButtonWasPushed(3), "ceiling fan speed is turned to medium" );
		equal( livingRoomCeilingFan.getSpeed(), livingRoomCeilingFan.MEDIUM, "ceiling fan speed is medium" );	

		ok( remoteControl.undoButtonWasPushed(), "ceiling fan is turned back to high" );
		equal( livingRoomCeilingFan.getSpeed(), livingRoomCeilingFan.HIGH, "ceiling fan status is high" );	

		ok( remoteControl.offButtonWasPushed(3), "ceiling fan speed is turned to off" );
		equal( livingRoomCeilingFan.getSpeed(), livingRoomCeilingFan.OFF, "ceiling fan speed is off" );	

		ok( remoteControl.undoButtonWasPushed(), "ceiling fan is turned back to off" );
		equal( livingRoomCeilingFan.getSpeed(), livingRoomCeilingFan.OFF, "ceiling fan status is off" );

	});

	module("remote control");
	test("remote control button", function() {
		ok( remoteControl.onButtonWasPushed(0), "front light is turned on" );
		equal( frontLight.getStatus(), frontLight.ON, "front light status is on");	

		ok( remoteControl.offButtonWasPushed(0), "front light is turned off" );
		equal( frontLight.getStatus(), frontLight.OFF, "front light status is off");	

		ok( remoteControl.onButtonWasPushed(1), "backyard light is turned on" );
		equal( backyardLight.getStatus(), backyardLight.ON, "backyard light status is on");	

		ok( remoteControl.offButtonWasPushed(1), "backyard light is turned off" );
		equal( backyardLight.getStatus(), backyardLight.OFF, "backyard light status is off");	

	});

	module("front light menu");
	test('light off command', function(){
		ok(frontLightOffCommand.execute(), "front light is turned off");
		equal(frontLight.getStatus(), frontLight.OFF, "front light is now off");
	
		ok(frontLightOffCommand.undo(), "front light is turned back on");
		equal(frontLight.getStatus(), frontLight.ON, "front light is now on");

		ok(frontLightOffCommand.execute(), "front light is turned off");
		equal(frontLight.getStatus(), frontLight.OFF, "front light is now off");

		ok(frontLightOnCommand.execute(), "front light is turned on");
		equal(frontLight.getStatus(), frontLight.ON, "front light is now on");
	
		ok(frontLightOnCommand.undo(), "front light is turned back off");
		equal(frontLight.getStatus(), frontLight.OFF, "front light is now off");

		ok(frontLightOnCommand.execute(), "front light is turned on");
		equal(frontLight.getStatus(), frontLight.ON, "front light is now on");

	});

	module("backyard light menu");
	test('light off command', function(){
		ok(backyardLightOffCommand.execute(), "backyard light is turned off");
		equal(backyardLight.getStatus(), backyardLight.OFF, "backyard light is now off");
	
		ok(backyardLightOffCommand.undo(), "backyard light is turned back on");
		equal(backyardLight.getStatus(), backyardLight.ON, "backyard light is now on");

		ok(backyardLightOffCommand.execute(), "backyard light is turned off");
		equal(backyardLight.getStatus(), backyardLight.OFF, "backyard light is now off");

		ok(backyardLightOnCommand.execute(), "backyard light is turned on");
		equal(backyardLight.getStatus(), backyardLight.ON, "backyard light is now on");
	
		ok(backyardLightOnCommand.undo(), "backyard light is turned back off");
		equal(backyardLight.getStatus(), backyardLight.OFF, "backyard light is now off");

		ok(backyardLightOnCommand.execute(), "backyard light is turned on");
		equal(backyardLight.getStatus(), backyardLight.ON, "backyard light is now on");

	});
} catch ( err ) {
	alert(err);
}
}
