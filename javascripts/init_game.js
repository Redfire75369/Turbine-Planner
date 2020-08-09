function preLoad() {
	document.getElementById("blades").style.display = "none";
	document.getElementById("coils").style.display = "none";
	document.getElementById("config").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById("custom_content").style.display = "none";

	refreshTurbine();
}

function postLoad() {
	drawTurbine(planner.diameter, planner.length);
	drawDynamoCoils();
	drawBearing(planner.bearingDiameter, false);

	for (let i = 0, ii = Object.keys(planner.customRotorColours); i < ii.length; i++) {
		newRotorSelection(planner.rotorTypes[ii[i]].name, planner.customRotorColours[ii[i]]);
	}
	for (let i = 0, ii = Object.keys(planner.customCoilColours); i < ii.length; i++) {
		newCoilSelection(planner.coilTypes[ii[i]].name, planner.customCoilColours[ii[i]]);
	}

	selectRotor(planner.activeRotor);
	selectCoil(planner.activeCoil);

	showNaviTab(planner.navigation);
}

function init_game() {
	preLoad();
	loadSave();
	postLoad();
}

init_game();

setInterval(function() {
	saveGame();
}, 10000);
