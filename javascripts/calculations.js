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
  return 4 * planner.diameter * (planner.diameter - planner.bearingDiameter) / 2
}
function getVolume() {
  return getBladeArea() * noBladeSets();
}

function maxBladeExpansionCoefficient() {
  let ret = 0
  for (let i = 0; i < planner.rotors.length; i++) {
    ret = Math.max(ret, rotors[planner.rotors[i]].coefficicentFactor);
  }
  return ret;
}

function recipeInputRateFP() {
  let recipeInputRateDiff = recipeInputRate;
  recipeInputRate = turbine_tension_throughput_factor * getMaxRecipeRateMultiplier();
  recipeInputRateDiff = Math.abs(recipeInputRateDiff - recipeInputRate);
  let roundingFactor =  Math.max(0, Math.E * Math.log1p(recipeInputRate() / (1 + recipeInputRateDiff)))
  return (roundingFactor * 0 + recipeInputRate()) / (1 + roundingFactor);
}

function getMaxRecipeRateMultiplier() {
  return  getVolume() * turbine_mb_per_blade;
}

function getNewRawProcessPower(previousRawPower, maxLimitPower, increasing) {
  let absoluteLeniency = getBladeArea() * getThroughputLeniencyMult() * turbine_mb_per_blade;
  let throughputEfficiency = getMaxRecipeRateMultiplier() == 0 ? 1 : Math.min(1, (recipeInputRateFP() + absoluteLeniency) / getMaxRecipeRateMultiplier());

  return increasing ? throughputEfficiency * (getVolume() * previousRawPower + maxLimitPower) / (getVolume() + 1) : throughputEfficiency * (getVolume() * previousRawPower) / (getVolume() + 2);
}

function getThroughputLeniencyMult() {
  return Math.max(turbine_throughput_efficiency_leniency, idealTotalExpansionLevel() <= 1 || maxBladeExpansionCoefficient() <= 1 ? Math.pow(2^1023) : Math.ceil(Math.log(idealTotalExpansionLevel()) / Math.log(maxBladeExpansionCoefficient())));
}

function getRawLimitProcessPower(recipeInputRate) {
	if (noBladeSets() == 0) {
		return 0;
	}
	return rotorEfficiency() * getExpansionIdealityMultiplier(idealTotalExpansionLevel(), totalExpansionLevel()) * recipeInputRate * basePowerPerMB;
}

function getExpansionIdealityMultiplier(ideal, actual) {
	if (ideal <= 0 || actual <= 0) {
		return 0;
	}
  return ideal < actual ? ideal / actual : actual / ideal;
}

function getIdealExpansionLevel(depth) {
	return Math.pow(idealTotalExpansionLevel(), (depth + 0.5) / planner.length);
}

function getRotorEfficiency() {
  let rotorEff = 0;
  for (let i = 0; i < planner.length; i++) {
    if (rotors[i].minEfficiency <= 0) {
      continue;
    }
    rotorEff += rotors[i].minEfficiency * getExpansionIdealityMultiplier(getIdealExpansionLevel(i), expansionLevels[i]);
  }
  return rotorEff;
}

function getInputRatePowerBonus() {
  return 1 + turbine_power_bonus_multiplier * Math.min(recipeInputRate(), getMaxRecipeRateMultiplier()) / (2 * turbine_mb_per_blade * Math.pow(getMaximumInteriorLength(), 2));
}

function getIdealExpansionLevels() {
	let levels = [];
	if (flowDir() == null) {
		return levels;
	}
	for (let i = 0; i < planner.length; i++) {
		levels[i] = (getIdealExpansionLevel(i));
	}
	return levels;
}
