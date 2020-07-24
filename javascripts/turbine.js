class TurbineBlade {
	constructor(name, minEff, coeff) {
		this.name = name;
	    this.efficiency = minEff;
	    this.coefficientFactor = coeff;
	}
}
class DynamoCoil {
	constructor(name, eff = 1) {
		this.name = name;
		this.efficiency = eff;
	}
}

function selectRotor(rotor) {
	document.getElementById("rotor_" + planner.activeRotor).parentElement.className = "tooltip turbinebox border";
	document.getElementById("rotor_" + rotor).parentElement.className = "tooltip turbinebox border selected";
	planner.activeRotor = rotor;
}
function setRotor(shaftPos) {
	planner.rotors[shaftPos] = planner.activeRotor;
}

function selectCoil(coil) {
	document.getElementById("coil_" + planner.activeCoil).className = "flex__col tooltip turbinebox turbinecoil border " + planner.activeCoil;
	document.getElementById("coil_" + coil).className = "flex__col tooltip turbinebox turbinecoil border selected " + coil;
	planner.activeCoil = coil;
}
function setCoil(x, y) {
	if (planner.coils[y][x] != "bearing") {
		planner.coils[y][x] = planner.activeCoil;
		activeDynamoCoils();
	}
}

function activeDynamoCoils() {
	for (let i = 1; i < planner.diameter + 1; i++) {
		for (let j = 1; j < planner.diameter + 1; j++) {
			switch (planner.coils[j - 1][i - 1]) {
				case "bearing":
					activeCoils[j - 1][i - 1] = true;
					break;
				case "connector":
					activeCoils[j - 1][i - 1] = atLeast(1, "magnesium", i - 1, j - 1) || atLeast(1, "beryllium", i - 1, j - 1) || atLeast(1, "aluminium", i - 1, j - 1) || atLeast(1, "copper", i - 1, j - 1) || atLeast(1, "gold", i - 1, j - 1) || atLeast(1, "silver", i - 1, j - 1);
					break;
				case "magnesium":
					activeCoils[j - 1][i - 1] = atLeast(1, "bearing", i - 1, j - 1) || atLeast(1, "connector", i - 1, j - 1);
					break;
				case "beryllium":
					activeCoils[j - 1][i - 1] = atLeast(1, "magnesium", i - 1, j - 1);
					break;
				case "aluminium":
					activeCoils[j - 1][i - 1] = atLeast(2, "magnesium", i - 1, j - 1);
					break;
				case "gold":
					activeCoils[j - 1][i - 1] = atLeast(1, "aluminium", i - 1, j - 1);
					break;
				case "copper":
					activeCoils[j - 1][i - 1] = atLeast(1, "beryllium", i - 1, j - 1);
					break;
				case "silver":
					activeCoils[j - 1][i - 1] = atLeast(1, "copper", i - 1, j - 1) && atLeast(1, "gold", i - 1, j - 1);
					break;
				default:
					activeCoils[j - 1][i - 1] = false;
			}
		}
	}
}

function getHorizontalCoils(x, y) {
	if (x == 0 && y == 0) {
		return {
			2: planner.coils[y][x + 1],
			3: planner.coils[y + 1][x]
		};
	} else if (x == 0 && y == planner.diameter - 1) {
		return {
			1: planner.coils[y - 1][x],
			2: planner.coils[y][x + 1]
		};
	} else if (x == planner.diameter - 1 && y == 0) {
		return {
			0: planner.coils[y][x - 1],
			3: planner.coils[y + 1][x]
		}
	} else if (x == planner.diameter - 1 && y == planner.diameter - 1) {
		return {
			0: planner.coils[y][x - 1],
			1: planner.coils[y - 1][x]
		}
	} else if (x == 0) {
		return {
			1: planner.coils[y - 1][x],
			2: planner.coils[y][x + 1],
			3: planner.coils[y + 1][x]
		}
	} else if (y == 0) {
		return {
			0: planner.coils[y][x - 1],
			2: planner.coils[y][x + 1],
			3: planner.coils[y + 1][x]
		}
	} else if (x == planner.diameter - 1) {
		return {
			0: planner.coils[y][x - 1],
			1: planner.coils[y - 1][x],
			3: planner.coils[y + 1][x]
		}
	} else if (y == planner.diameter - 1) {
		return {
			0: planner.coils[y][x - 1],
			1: planner.coils[y - 1][x],
			2: planner.coils[y][x + 1]
		};
	} else {
		return {
			0: planner.coils[y][x - 1],
			1: planner.coils[y - 1][x],
			2: planner.coils[y][x + 1],
			3: planner.coils[y + 1][x]
		}
	}
}

function keyIntoActivation(key, x, y) {
	if (key === undefined) {
		return false;
	}
	switch (key.toString()) {
		case "0":
			return activeCoils[y][x - 1];
		case "1":
			return activeCoils[y - 1][x];
		case "2":
			return activeCoils[y][x + 1];
		case "3":
			return activeCoils[y + 1][x];
		default:
			return false;
	}
}
