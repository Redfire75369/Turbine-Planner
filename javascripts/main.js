function getDefaultData() {
	return {
		version: "1.12.2-2o.3.2",
		plannerVersion: "0.5.0",

		diameter: 3,
		length: 3,
		bearingDiameter: 1,

		steam: 0,

		rotors: [],
		rotorTypes: {
			steel: new TurbineBlade("steel", 1, 1.4, "Steel"),
			extreme: new TurbineBlade("extreme", 1.1, 1.6, "Extreme"),
			sic_sic_cmc: new TurbineBlade("sic_sic_cmc", 1.2, 1.8, "SiC SiC CMC"),
			stator: new TurbineBlade("stator", 0, 0.75, "Stator")
		},
		customRotorColours: {},
		activeRotor: "steel",

		coils: [[]],
		coilTypes: {
			none: new DynamoCoil("none", 0, parseRules("four none coils"), "Turbine Casing"),
			bearing: new DynamoCoil("bearing", 0, parseRules("zero magnesium coils"), "Rotor Bearing"),
			connector: new DynamoCoil("connector", 0, parseRules("one of any coil"), "Dynamo Coil Connector"),
			magnesium: new DynamoCoil("magnesium", 0.86, parseRules("one bearing || one connector"), "Magnesium Dynamo Coil"),
			beryllium: new DynamoCoil("beryllium", 0.9, parseRules("one magnesium coil"), "Beryllium Dynamo Coil"),
			aluminum: new DynamoCoil("aluminum", 0.98, parseRules("two magnesium coils"), "Aluminum Dynamo Coil"),
			gold: new DynamoCoil("gold", 1.04, parseRules("one aluminum coil"), "Gold Dynamo Coil"),
			copper: new DynamoCoil("copper", 1.1, parseRules("one beryllium coil"), "Copper Dynamo Coil"),
			silver: new DynamoCoil("silver", 1.12, parseRules("one gold coil && one copper coil"), "Silver Dynamo Coil")
		},
		customCoilColours: {},
		activeCoil: "magnesium",

		config: {
			turbine_power_per_mb: [16, 4, 4],
			ideal_total_expansion_level: [4, 2, 2],
			turbine_mb_per_blade: 100,
			turbine_throughput_efficiency_leniency: 1,
			turbine_tension_throughput_factor: 2,
			turbine_power_bonus_multiplier: 1
		},

		navigation: "blades"
	}
}

var planner = getDefaultData();
var activeCoils = [];

function refreshTurbine() {
	planner.rotors = [];
	planner.coils = [];
	let d = parseInt(document.getElementById("diameter").value);
	let l = parseInt(document.getElementById("shaft_length").value);

	drawTurbine(d, l);
	drawDynamoCoils();
	drawBearing(d % 2 == 1 ? 1 : 2);
}

function toFixed(x, dp) {
	return Math.round(x * Math.pow(10, dp)) / Math.pow(10, dp);
}
