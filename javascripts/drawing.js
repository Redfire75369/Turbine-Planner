const bladesDiv = document.getElementById("blades_row");
const coilsDiv = document.getElementById("coils_row");

function drawTurbine(diameter, length) {
	if (diameter < 3 || length < 3 || diameter > 48 || length > 48) {
		alert("Invalid Turbine Dimensions");
		return;
	}

	planner.diameter = diameter;
	planner.length = length;

	let needRefresh = planner.rotors.length == 0;
	let start = planner.diameter % 2 == 0 ? planner.diameter / 2 - (planner.bearingDiameter / 2) + 1 : (planner.diameter + 1) / 2 - (planner.bearingDiameter + 1) / 2 + 1;

	bladesDiv.innerHTML = "";

	for (let i = 0; i < length + 2; i++) {
		let column = document.createElement("DIV");
		column.setAttribute("id", "turbine_col_" + i);
		column.setAttribute("class", "flex__col turbine");
		bladesDiv.append(column);

		if (i > 0 && i < length + 1 && needRefresh) {
			planner.rotors[i - 1] = "steel";
		}
		for (let j = 0; j < diameter + 2; j++) {
			let row = document.createElement("DIV");
			let blade = null;

			row.setAttribute("id", "turbine_row_" + j + "_" + i);
			if (!(j == 0 || j == diameter + 1 || i == 0 || i == length + 1)) {
				blade = document.createElement("DIV");
			} else {
				row.setAttribute("class", "flex__row turbinebox turbinecasing");
			}
			document.getElementById("turbine_col_" + i).append(row);
			if (blade != null) {
				document.getElementById("turbine_row_" + j + "_" + i).append(blade);
			}
		}
	}
	updateUIBlades();
}

function drawBearing(bearingDiameter) {
	if (planner.diameter % 2 != bearingDiameter % 2 || bearingDiameter + 2 > planner.diameter) {
		alert("Invalid Bearing Diameter");
		return;
	}
	planner.bearingDiameter = bearingDiameter;
	let start = planner.diameter % 2 == 0 ? planner.diameter / 2 - (bearingDiameter / 2) + 1 : (planner.diameter + 1) / 2 - (bearingDiameter + 1) / 2 + 1;
	for (let i = 1; i < planner.diameter + 1; i++) {
		for (let j = 1; j < planner.diameter + 1; j++) {
			if (j >= start && j < start + bearingDiameter && i >= start && i < start + bearingDiameter) {
				planner.coils[i - 1][j - 1] = "bearing";
			}
		}
	}
}

function drawDynamoCoils() {
	let needRefresh = planner.coils.length == 0;

	let start = planner.diameter % 2 == 0 ? planner.diameter / 2 - (planner.bearingDiameter / 2) + 1 : (planner.diameter + 1) / 2 - (planner.bearingDiameter + 1) / 2 + 1;
	coilsDiv.innerHTML = "";

	for (let i = 0; i < planner.diameter + 2; i++) {
		let column = document.createElement("DIV");
		column.setAttribute("id", "coils_col_" + i);
		column.setAttribute("class", "flex__col turbine");
		coilsDiv.append(column);

		if (i > 0 && i < planner.diameter + 1 && needRefresh) {
			planner.coils[i - 1] = [];
			activeCoils[i - 1] = [];
		}
		for (let j = 0; j < planner.diameter + 2; j++) {
			if (needRefresh) {
				if (j > 0 && j < planner.diameter + 1 && i > 0 && i < planner.diameter + 1) {
					planner.coils[i - 1][j - 1] = "none";
					activeCoils[i - 1][j - 1] = false;
				}
				if ((planner.diameter % 2 == 0 && ((j == planner.diameter / 2 || j == (planner.diameter + 2) / 2)) && ((i == planner.diameter / 2 || i == (planner.diameter + 2) / 2))) || (planner.diameter % 2 == 1 && j == (planner.diameter + 1) / 2 && i == (planner.diameter + 1) /2)) {
					planner.coils[i - 1][j - 1] = "bearing";
				}
			}

			let coil = document.createElement("DIV");

			coil.setAttribute("id", "coils_row_" + j + "_" + i);
			if (!(j == 0 || j == planner.diameter + 1 || i == 0 || i == planner.diameter + 1)) {
				if (j < start || j >= start + planner.bearingDiameter || i < start || i >= start + planner.bearingDiameter) {
					coil.setAttribute("onclick", "setCoil(" + (i - 1) + ", " + (j - 1) + ")");
				}
			} else {
				coil.setAttribute("class", "flex__row turbinebox turbinecasing small");
			}
			document.getElementById("coils_col_" + i).append(coil);
		}
	}
}
