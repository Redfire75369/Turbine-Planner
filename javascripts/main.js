function getDefaultData() {
	return {
		diameter: 3,
		length: 3,
		bearingDiameter: 1,

		steam: 0,

		rotors: [],
		activeRotor: "steel",

		coils: [],
		activeCoil: "magnesium",

		navigation: "blades"
	}
}

var planner = getDefaultData();
var activeCoils = [];

var rotors = {
	steel: new TurbineBlade("steel", 1, 1.4),
	extreme: new TurbineBlade("extreme", 1.1, 1.6),
	sicsiccmc: new TurbineBlade("sicsiccmc", 1.2, 1.8),
	stator: new TurbineBlade("stator", 0, 0.75)
}
var coils = {
	none: new DynamoCoil("none", 0),
	bearing: new DynamoCoil("bearing", 0),
	connector: new DynamoCoil("connector", 0),
	magnesium: new DynamoCoil("magnesium", 0.86),
	beryllium: new DynamoCoil("beryllium", 0.9),
	aluminium: new DynamoCoil("aluminium", 0.98),
	gold: new DynamoCoil("gold", 1.04),
	copper: new DynamoCoil("copper", 1.1),
	silver: new DynamoCoil("silver", 1.12)
};

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
var ideal_total_expansion_level = [
	4,
	2,
	2
];

document.getElementById("coils").style.display = "none";
document.getElementById("coil_desc_none").style.display = "none";
document.getElementById("coil_desc_connector").style.display = "none";
document.getElementById("coil_desc_magnesium").style.display = "none";
document.getElementById("coil_desc_beryllium").style.display = "none";
document.getElementById("coil_desc_aluminium").style.display = "none";
document.getElementById("coil_desc_gold").style.display = "none";
document.getElementById("coil_desc_copper").style.display = "none";
document.getElementById("coil_desc_silver").style.display = "none";

selectRotor("steel");
selectCoil("magnesium");

function refreshTurbine() {
	planner.rotors = [];
	planner.coils = [];
	let d = parseInt(document.getElementById("diameter").value);
	let l = parseInt(document.getElementById("shaft_length").value);

	drawTurbine(d, l);
	drawDynamoCoils();
	drawBearing(d % 2 == 1 ? 1 : 2);
}

refreshTurbine();
