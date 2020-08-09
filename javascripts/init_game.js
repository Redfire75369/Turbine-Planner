function preLoad() {
	document.getElementById("blades").style.display = "none";
	document.getElementById("coils").style.display = "none";
	document.getElementById("config").style.display = "none";
	document.getElementById("options").style.display = "none";

	refreshTurbine();
}

function postLoad() {
	selectRotor(planner.activeRotor);
	selectCoil(planner.activeCoil);

	drawTurbine(planner.diameter, planner.length);
	drawDynamoCoils();
	drawBearing(planner.bearingDiameter, false);

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
