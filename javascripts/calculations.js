function noBladeSets() {
	let ret = 0
	for (let i = 0; i < planner.rotors.length; i++) {
		if (planner.rotors[i] != "stator") {
			ret++;
		}
	}
	return ret;
}

function getBladeArea() {
	return 2 * planner.bearingDiameter * (planner.diameter - planner.bearingDiameter);
}
function getVolume() {
	return getBladeArea() * noBladeSets();
}
function getMaxRecipeRateMultiplier() {
	return getVolume() * turbine_mb_per_blade;
}

function maxBladeExpansionCoefficient() {
	let ret = 0
	for (let i = 0; i < planner.rotors.length; i++) {
		ret = Math.max(ret, rotors[planner.rotors[i]].coefficientFactor);
	}
	return ret;
}

function getIdealExpansionLevel(depth) {
	return Math.pow(ideal_total_expansion_level[planner.steam], (depth + 0.5) / planner.length);
}

function getExpansionLevel(depth) {
    let totalExpansion = 1;
    for (let i = 0; i < depth; i ++) {
        totalExpansion *= rotors[planner.rotors[i]].coefficientFactor;
    }
    return totalExpansion * (1 + rotors[planner.rotors[depth]].coefficientFactor) / 2;
}
function getTotalExpansionLevel() {
	let totalExpansion = 1;
	for (let i = 0; i < planner.length; i ++) {
        totalExpansion *= rotors[planner.rotors[i]].coefficientFactor;
    }
    return totalExpansion;
}

function getThroughputLeniencyMult() {
	return Math.min(turbine_throughput_efficiency_leniency, ideal_total_expansion_level[planner.steam] <= 1 || maxBladeExpansionCoefficient() <= 1 ? Number.MAX_VALUE : Math.ceil(Math.log(ideal_total_expansion_level[planner.steam]) / Math.log(maxBladeExpansionCoefficient())));
}

function getExpansionIdealityMultiplier(ideal, actual) {
	if (ideal <= 0 || actual <= 0) {
		return 0;
	}
	return ideal < actual ? ideal / actual : actual / ideal;
}
function getRotorEfficiency() {
	let rotorEff = 0;
	for (let i = 0; i < planner.length; i++) {
		rotorEff += rotors[planner.rotors[i]].efficiency * getExpansionIdealityMultiplier(getIdealExpansionLevel(i), getExpansionLevel(i));
	}
	return rotorEff / noBladeSets();
}
function getDynamoCoilEfficiency() {
	let ret = 1;
	let coilCount = 0;
	for (let i = 1; i < planner.diameter + 1; i++) {
		for (let j = 1; j < planner.diameter + 1; j++) {
			if (coils[planner.coils[i - 1][j - 1]].efficiency > 0 && activeCoils[i - 1][j - 1]) {
				ret *= coils[planner.coils[i - 1][j - 1]].efficiency;
				coilCount++;
			}
		}
	}
	return coilCount == 0 ? 0 : ret / coilCount;
}
function getThroughputEfficiency() {
	let absoluteLeniency = getBladeArea() * getThroughputLeniencyMult() * turbine_mb_per_blade;
	return getMaxRecipeRateMultiplier() == 0 ? 1 : Math.min(1, (getMaxRecipeRateMultiplier() + absoluteLeniency) / getMaxRecipeRateMultiplier());
}

function getTotalPower() {
	let base = turbine_power_per_mb[planner.steam] * getMaxRecipeRateMultiplier();
	base *= getExpansionIdealityMultiplier(ideal_total_expansion_level[planner.steam], getTotalExpansionLevel());
	base *= getRotorEfficiency();
	base *= getDynamoCoilEfficiency();
	base *= getThroughputEfficiency();
	base *= 1 + getMaxRecipeRateMultiplier() / 691200;
	return Math.round(base);
}