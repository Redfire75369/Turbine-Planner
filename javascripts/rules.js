function atLeast(amount, type, x, y) {
	let adjacent = getHorizontalCoils(x, y);
	let keys = Object.keys(adjacent);
	let activated = true;
	let key = 4;
	let count = 0;
	for (let i = 0, ii = Object.keys(adjacent).filter(key => adjacent[key] == type); i < ii.length; i++) {
		activated = keyIntoActivation(ii[i], x, y);
		if (activated) {
			count++;
		}
	}
	return count >= amount;
}

function exactly(amount, type, x, y) {
	let adjacent = getHorizontalCoils(x, y);
	let keys = Object.keys(adjacent);
	let activated = true;
	let key = 4;
	let count = 0;
	for (let i = 0, ii = Object.keys(adjacent).filter(key => adjacent[key] == type); i < ii.length; i++) {
		activated = keyIntoActivation(ii[i], x, y);
		if (activated) {
			count++;
		}
	}
	return count == amount;
}

function atMost(amount, type, x, y) {
	let adjacent = getHorizontalCoils(x, y);
	let keys = Object.keys(adjacent);
	let activated = true;
	let key = 4;
	let count = 0;
	for (let i = 0, ii = Object.keys(adjacent).filter(key => adjacent[key] == type); i < ii.length; i++) {
		activated = keyIntoActivation(ii[i], x, y);
		if (activated) {
			count++;
		}
	}
	return count <= amount;
}

function axial(amount, type, x, y) {
	let adjacent = getHorizontalCoils(x, y);
	let axis = [
		[adjacent[0], adjacent[2]],
		[adjacent[1], adjacent[3]]
	];
	let keys = [
		[0, 2],
		[1, 3]
	]
	let count = 0;
	for (let i = 0; i < 2 && count < amount; i++) {
		if (axis[i][0] == type && axis[i][1] == type && keyIntoActivation(keys[i][0], x, y) && keyIntoActivation(keys[i][1], x, y)) {
			count++;
		}
	}
	return count >= amount;
}
