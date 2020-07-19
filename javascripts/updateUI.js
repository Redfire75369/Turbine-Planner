function updateUIBlades() {
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
	activeDynamoCoils();
	for (let i = 1; i < planner.diameter + 1; i++) {
		for (let j = 1; j < planner.diameter + 1; j++) {
			if (planner.coils[i - 1][j - 1] != "none" && planner.coils[i - 1][j - 1] != "bearing") {
				if (activeCoils[i - 1][j - 1]) {
					document.getElementById("coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil border active " + planner.coils[i - 1][j - 1]);
				} else  {
					document.getElementById("coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil border inactive " + planner.coils[i - 1][j - 1]);
				}
			} else {
				document.getElementById("coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil border " + planner.coils[i - 1][j - 1]);
			}
		}
	}
}

function updateUIStats() {
	document.getElementById("power").innerText = getTotalPower();
	document.getElementById("steam").innerText = getMaxRecipeRateMultiplier();
	document.getElementById("rotor_eff").innerText = getRotorEfficiency();
	document.getElementById("dynamo_coil_eff").innerText = getDynamoCoilEfficiency();
}

setInterval(function() {
	updateUIBlades();
	updateUICoils();
	updateUIStats();
}, 100);
