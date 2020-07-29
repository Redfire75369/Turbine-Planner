class PlacementRule {
	constructor() {
		this.type = "at least";
		this.requirement = "bearing";
		this.amount = 1;
	}
}

class DynamoCoilRuleSet {
	constructor() {
		this.rules;
		this.var;
	}
}

const numbers = {
	"zero": 0,
	"one": 1,
	"two": 2,
	"three": 3,
	"four": 4
};

function parseRule(baseRule) {
	baseRule = baseRule.toLowerCase();

	let ruleSet = new DynamoCoilRuleSet();
	ruleSet.var = baseRule.indexOf("||") < 0 ? "&&" : "||";

	ruleSet.rules = baseRule.split(ruleSet.var).map(function(i) {
		if (i.includes("vertex")) {
			alert("Vertex rule not supported for dynamo coils.");
			return new PlacementRule();
		}

		let rule = new PlacementRule();
		rule.type = i.includes("axial") ? "axial" : i.includes("exactly") ? "exactly" : i.includes("at most") ? "at most" : "at least";

		i.trim().split(" ").forEach(function(j) {
			if (j == "at" || j == "least" || j == "exactly" || j == "most" || j == "axial"  || j == "of" || j == "coil" || j == "coils") {
				return;
			}
			if (Object.keys(numbers).includes(j)) {
				rule.amount = numbers[j];
				return;
			}
			rule.requirement = j;
		});
		if (rule.type == "axial ") {
			rule.count = 2;
		}
		
		return rule;
	});
	
	return ruleSet;
}

console.log(JSON.stringify(parseRule("one graphite coil || one magnesium coil")));

function interpretRuleSet(ruleSet, x, y) {
	let output = ruleSet.var == "&&";
	ruleSet.rules.forEach(function(rule) {
		if (ruleSet.var == "&&") {
			output &= placementRule(rule.type, rule.amount, rule.requirement, x, y);
		} else {
			output |= placementRule(rule.type, rule.amount, rule.requirement, x, y);
		}
	})
	return output;
}

function atLeast(amount, requirement, x, y) {
	let activated = true;
	let count = 0;
	let adjacent = getHorizontalCoils(x, y);
	let keys = Object.keys(adjacent);
	if (requirement != "any") {
		keys = keys.filter(key => adjacent[key] == requirement);
	} else {
		keys = keys.filter(key => adjacent[key] != "none" && adjacent[key] != "bearing" && adjacent[key] != "connector");
	}

	for (let i = 0; i < keys.length; i++) {
		activated = keyIntoActivation(keys[i], x, y);
		if (activated) {
			count++;
		}
	}
	return count >= amount;
}

function exactly(amount, requirement, x, y) {
	let activated = true;
	let key = 4;
	let count = 0;
	let adjacent = getHorizontalCoils(x, y);
	let keys = Object.keys(adjacent);
	if (requirement != "any") {
		keys = keys.filter(key => adjacent[key] == requirement);
	} else {
		keys = keys.filter(key => adjacent[key] != requirement);
	}

	for (let i = 0; i < keys.length; i++) {
		activated = keyIntoActivation(keys[i], x, y);
		if (activated) {
			count++;
		}
	}
	return count == amount;
}

function atMost(amount, requirement, x, y) {
	let activated = true;
	let count = 0;
	let adjacent = getHorizontalCoils(x, y);
	let keys = Object.keys(adjacent);
	if (requirement != "any") {
		keys = keys.filter(key => adjacent[key] == requirement);
	} else {
		keys = keys.filter(key => adjacent[key] != requirement);
	}

	for (let i = 0; i < keys.length; i++) {
		activated = keyIntoActivation(keys[i], x, y);
		if (activated) {
			count++;
		}
	}
	return count <= amount;
}

function axial(amount, requirement, x, y) {
	let adjacent = getHorizontalCoils(x, y);
	let axis = [
		[adjacent[0], adjacent[2]],
		[adjacent[1], adjacent[3]]
	];
	let keys = [
		[0, 2],
		[1, 3]
	];

	let count = 0;
	for (let i = 0; i < 2 && count < amount; i++) {
		if (axis[i][0] == requirement && axis[i][1] == requirement && keyIntoActivation(keys[i][0], x, y) && keyIntoActivation(keys[i][1], x, y)) {
			return true;
		}
	}
}

function placementRule(rule, amount, requirement, x, y) {
	if (requirement == "none") {
		return false;
	}
	switch (rule) {
		case "at least":
			return atLeast(amount, requirement, x, y);
		case "exactly":
			return exactly(amount, requirement, x, y);
		case "at most":
			return atMost(amount, requirement, x, y);
		case "axial":
			return axial(amount, requirement, x, y);
	}
}
	