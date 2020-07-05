class TurbineBlade {
	constructor(name, minEff, coeff) {
		this.name = name;
    this.minEfficiency = minEff;
    this.coefficicentFactor = coeff;
    this.length = 1;
	}

	/*get totalEff() {
		return pow(4 * this.efficiency, 2);
	}*/

	lengthen() {
		if (this.length < maxLength) {
			this.length++;
		}
	}
	shorten() {
		if (this.length > 0) {
			this.length--;
		}
	}
}

var rotors = {
	none: new TurbineBlade("none", 0, 1, 1),
	stator: new TurbineBlade("stator", 0, 0.6, 2.4),
	steel: new TurbineBlade("steel", 1, 1.1, 0.8)
};

function selectRotor(rotor) {
	document.getElementById("rotor_" + player.turbine.activeRotor).parentElement.className = "turbinebox";
	document.getElementById("rotor_" + rotor).parentElement.className = "turbinebox selected";
	player.turbine.activeRotor = rotor;
}

function setRotor(shaftPos) {
	let current = 0;
	for (let i = 0; i < 11; i++) {
		if (player.turbine.rotors[i] == player.turbine.activeRotor) {
			current++;
		}
	}
	if (player.turbine.totalRotors[player.turbine.activeRotor] >= current + 4) {
		player.turbine.rotors[shaftPos] = rotors[player.turbine.activeRotor];
		player.turbine.rotors[shaftPos].lengthen();
	}
}
