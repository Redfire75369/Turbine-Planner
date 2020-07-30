function updateUIBlades() {
	document.getElementById("rotor_eff_steel").innerText = (rotors["steel"].efficiency * 100).toFixed(2);
	document.getElementById("rotor_eff_extreme").innerText = (rotors["extreme"].efficiency * 100).toFixed(2);
	document.getElementById("rotor_eff_sic_sic_cmc").innerText = (rotors["sic_sic_cmc"].efficiency * 100).toFixed(2);

	document.getElementById("rotor_exp_steel").innerText = (rotors["steel"].coefficientFactor * 100).toFixed(2);
	document.getElementById("rotor_exp_extreme").innerText = (rotors["extreme"].coefficientFactor * 100).toFixed(2);
	document.getElementById("rotor_exp_sic_sic_cmc").innerText = (rotors["sic_sic_cmc"].coefficientFactor * 100).toFixed(2);
	document.getElementById("rotor_exp_stator").innerText = (rotors["stator"].coefficientFactor * 100).toFixed(2);
	
	let start = planner.diameter % 2 == 0 ? planner.diameter / 2 - (planner.bearingDiameter / 2) + 1 : (planner.diameter + 1) / 2 - (planner.bearingDiameter + 1) / 2 + 1;
	for (let i = 1; i < planner.length + 1; i++) {
		for (let j = 1; j < planner.diameter + 1; j++) {
			if (j >= start && j < start + planner.bearingDiameter) {
				document.getElementById("turbine_row_" + j + "_" + i).setAttribute("class", "flex__row turbinebox turbineshaft");
				document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor " + planner.rotors[i - 1]);
				document.getElementById("turbine_row_" + j + "_" + i).setAttribute("onclick", "setRotor(" + (i - 1)+ ")");
			} else {
				document.getElementById("turbine_row_" + j + "_" + i).setAttribute("class", "flex__row turbinebox");
				if (j == 1) {
					document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal top " + planner.rotors[i - 1]);
				} else if (j == planner.diameter) {
					document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal bottom " + planner.rotors[i - 1]);
				} else {
					document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal " + planner.rotors[i - 1]);
				}
			}
		}
	}
}

function updateUICoils() {
	for (let i = 0, ii = Object.keys(coils); i < ii.length; i++) {
		if (ii[i] !== "none" && ii[i] !== "bearing" && ii[i] !== "connector") {
			document.getElementById("coil_eff_" + ii[i]).innerText = (coils[ii[i]].efficiency * 100).toFixed(2);
			document.getElementById("coil_rule_" + ii[i]).innerText = parseTooltip(coils[ii[i]].ruleSet);
		}
	}

	activeDynamoCoils();
	for (let i = 1; i < planner.diameter + 1; i++) {
		for (let j = 1; j < planner.diameter + 1; j++) {
			if (planner.coils[j - 1][i - 1] != "none" && planner.coils[j - 1][i - 1] != "bearing") {
				if (activeCoils[j - 1][i - 1]) {
					document.getElementById("coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil border active " + planner.coils[j - 1][i - 1]);
				} else  {
					document.getElementById("coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil border inactive " + planner.coils[j - 1][i - 1]);
				}
			} else {
				document.getElementById("coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil border " + planner.coils[j - 1][i - 1]);
			}
		}
	}
}

function updateUIStats() {
	document.getElementById("power").innerText = getTotalPower();
	document.getElementById("steam").innerText = getMaxRecipeRate();
	document.getElementById("throughput_eff").innerText = getThroughputEfficiency().toFixed(2);
	document.getElementById("rate_bonus").innerText = (1 + getMaxRecipeRate() / 691200).toFixed(2);
	document.getElementById("rotor_eff").innerText = (getRotorEfficiency() * 100).toFixed(2);
	document.getElementById("dynamo_coil_eff").innerText = (getDynamoCoilEfficiency() * 100).toFixed(2);
}

setInterval(function() {
	updateUIBlades();
	updateUICoils();
	updateUIStats();
}, 100);
