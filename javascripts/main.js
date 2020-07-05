function getDefaultData() {
	return {
		diameter: 3,
		length: 3,
		bearingDiameter: 1,

		rotors: [],
		rotorLength: 1,

		coils: [],

		navigation: "blades"
	}
}

var planner = getDefaultData();

var rotors = {
	"none": new TurbineBlade("none", 1, 1),
	"steel": new TurbineBlade("steel", 1, 1.4),
	"extreme": new TurbineBlade("extreme", 1.1, 1.6),
	"sicsiccmc": new TurbineBlade("sicsiccmc", 1.2, 1.8),
	"stator": new TurbineBlade("stator", 0, 0.75)
}

var turbine_mb_per_blade = 100;
var turbine_throughput_efficiency_leniency = 1;
var turbine_tension_throughput_factor = 2;
var turbine_power_bonus_multiplier = 1;
var recipeInputRate = 0;
var turbine_power_per_mb = [
	16,
	4,
	4
];
var idealTotalExpansionLevel = [
	4,
	2,
	2
];


document.getElementById("coils").style.display = "none";

function refreshTurbine() {
	planner.rotors = [];
	planner.coils = [];
	let d = parseInt(document.getElementById("diameter").value);
	let l = parseInt(document.getElementById("shaft_length").value);

	updateTurbine(d, l);
	updateBearing(d % 2 == 1 ? 1 : 2);
	updateTurbineBlades();
	updateDynamoCoils();
}

refreshTurbine();
