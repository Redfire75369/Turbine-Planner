const blades = document.getElementById("blades_row");
const coils = document.getElementById("coils_row");

function updateTurbine(diameter, length) {
	if (diameter < 3 || length < 3 || diameter > 48 || length > 48) {
		alert("Invalid Turbine Dimensions");
		return;
	}

	planner.diameter = diameter;
	planner.length =	length;

	let needRefresh = planner.rotors.length == 0;

	blades.innerHTML = "";

	for (let i = 0; i < length + 2; i++) {
		let column = document.createElement("DIV");
		column.setAttribute("id", "turbine_col_" + i);
		column.setAttribute("class", "flex__col turbine");
		blades.append(column);

		if (i > 0 && i < length + 2 && needRefresh) {
			planner.rotors[i - 1] = "none";
		}
		for (let j = 0; j < diameter + 2; j++) {
			let row = document.createElement("DIV");
			let blade = null;

			row.setAttribute("id", "turbine_row_" + j + "_" + i);
			if (j == 0 || j == diameter + 1 || i == 0 || i == length + 1) {
				row.setAttribute("class", "flex__row turbinebox turbinecasing");
			} else if ((diameter % 2 == 1 && j == (diameter + 1) / 2) || (diameter % 2 == 0 && (j == diameter / 2 || j == (diameter + 2) / 2))) {
				row.setAttribute("class", "flex__row turbinebox turbineshaft");

				blade = document.createElement("DIV");
				blade.setAttribute("class", "turbinerotor");
			} else {
				row.setAttribute("class", "flex__row turbinebox");

				blade = document.createElement("DIV");
				blade.setAttribute("class", "turbinerotor");
			}
			document.getElementById("turbine_col_" + i).append(row);
			if (blade != null) {
				document.getElementById("turbine_row_" + j + "_" + i).append(blade);
			}
		}
	}
}

function updateBearing(bearingDiameter) {
	if (planner.diameter % 2 == bearingDiameter % 2 && bearingDiameter + 2 <= planner.diameter) {
		planner.bearingDiameter = bearingDiameter;
	} else {
		alert("Invalid Bearing Diameter");
		return;
	}
}

function updateTurbineBlades() {
	let start = planner.diameter % 2 == 0 ? planner.diameter / 2 - (planner.bearingDiameter / 2) + 1 : (planner.diameter + 1) / 2 - (planner.bearingDiameter + 1) / 2 + 1;
	for (let i = 1; i < planner.length + 1; i++) {
		for (let j = 1; j < planner.diameter + 1; j++) {
			if (j < start || j >= start + planner.bearingDiameter) {
				document.getElementById("turbine_row_" + j + "_" + i).setAttribute("class", "flex__row turbinebox");
				if (j == 1) {
					document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal top " + planner.rotors[i - 1]);
				} else if (j == planner.diameter) {
					document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal bottom " + planner.rotors[i - 1]);
				} else {
					document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal " + planner.rotors[i - 1]);
				}
			} else {
				document.getElementById("turbine_row_" + j + "_" + i).setAttribute("class", "flex__row turbinebox turbineshaft");
				document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor " + planner.rotors[i - 1]);
			}
		}
	}
}

function updateDynamoCoils() {
	let needRefresh = planner.coils.length == 0;

	let start = planner.diameter % 2 == 0 ? planner.diameter / 2 - (planner.bearingDiameter / 2) + 1 : (planner.diameter + 1) / 2 - (planner.bearingDiameter + 1) / 2 + 1;
	coils.innerHTML = "";

	for (let i = 0; i < planner.diameter + 2; i++) {
		let column = document.createElement("DIV");
		column.setAttribute("id", "coils_col_" + i);
		column.setAttribute("class", "flex__col turbine");
		coils.append(column);

		if (i > 0 && i < planner.diameter + 2 && needRefresh) {
			planner.coils[i - 1] = [];
		}
		for (let j = 0; j < planner.diameter + 2; j++) {
			if (needRefresh) {
				if (j > 0 && j < planner.diameter + 2 && i > 0 && i < planner.diameter + 2) {
					planner.coils[i - 1][j - 1] = "none";
				}
				if ((planner.diameter % 2 == 0 && ((j == planner.diameter / 2 || j == (planner.diameter + 2) / 2)) && ((i == planner.diameter / 2 || i == (planner.diameter + 2) / 2))) || (planner.diameter % 2 == 1 && j == (planner.diameter + 1) / 2 && i == (planner.diameter + 1) /2)) {
					planner.coils[i - 1][j - 1] = "bearing";
				}
			}

			let coil = document.createElement("DIV");

			coil.setAttribute("id", "coils_row_" + j + "_" + i);
			if (j == 0 || j == planner.diameter + 1 || i == 0 || i == planner.length + 1) {
				coil.setAttribute("class", "flex__row turbinebox turbinecasing");
			} else if (j < start || j >= start + planner.bearingDiameter || i < start || i >= start + planner.bearingDiameter) {
				coil.setAttribute("class", "flex__row turbinebox turbinecoil " + planner.coils[i - 1][j - 1]);
			} else {
				planner.coils[i - 1][j - 1] = "bearing";
				coil.setAttribute("class", "flex__row turbinebox turbinecoil bearing");
			}
			document.getElementById("coils_col_" + i).append(coil);
		}
	}
}
