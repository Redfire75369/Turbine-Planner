class PlacementRule {
	constructor() {
		this.type = "at least";
		this.requirement = "bearing";
		this.amount = 1;
		this.axial = false;
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
const reverseNumbers = {
	0: "zero",
	1: "one",
	2: "two",
	3: "three",
	4: "four"
};

function parseRules(baseRule) {
	baseRule = baseRule.toLowerCase();

	let ruleSet = new DynamoCoilRuleSet();
	ruleSet.var = baseRule.indexOf("||") < 0 ? "&&" : "||";

	ruleSet.rules = baseRule.split(ruleSet.var).map(function(i) {
		if (i.includes("vertex")) {
			alert("Vertex rule not supported for dynamo coils.");
			return new PlacementRule();
		}

		let rule = new PlacementRule();
		rule.type = i.includes("exactly") ? "exactly" : i.includes("at most") ? "at most" : "at least";
		rule.axial = i.includes("axial");

		i.trim().split(" ").forEach(function(j) {
			if (j == "at" || j == "least" || j == "exactly" || j == "most" || j == "axial"  || j == "of" || j == "dynamo" || j == "coil" || j == "coils") {
				return;
			}
			if (Object.keys(numbers).includes(j)) {
				rule.amount = numbers[j];
				return;
			}
			rule.requirement = j;
		});
		if (rule.axial) {
			rule.count = 2;
		}
		
		return rule;
	});
	
	return ruleSet;
}

function stringifyRules(rules) {
	let output = "";
	rules.ruleSet.forEach(function(rule) {
		output += rule.type + " " + reverseNumbers[rule.amount] + " " + rule.requirement + "coils " + ruleSet.var;
	});
	return output;
}

function interpretRuleSet(ruleSet, x, y) {
	let output = ruleSet.var == "&&";
	ruleSet.rules.forEach(function(rule) {
		if (ruleSet.var == "&&") {
			output &= placementRule(rule.axial, rule.type, rule.amount, rule.requirement, x, y);
		} else {
			output |= placementRule(rule.axial, rule.type, rule.amount, rule.requirement, x, y);
		}
	})
	return output;
}

function placementRule(axial, type, amount, requirement, x, y) {
	if (requirement == "none") {
		return false;
	}
	return axial ? axial(type, amount, requirement, x, y) : nonAxial(type, amount, requirement, x, y);
}

function nonAxial(type, amount, requirement, x, y) {
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
	
	switch (type) {
		case "at least":
			return count >= amount;
		case "exactly":
			return count == amount;
		case "at most":
			return count <= amount;
	}
}

function axial(type, amount, requirement, x, y) {
	let adjacent = getHorizontalCoils(x, y);
	let axis = [
		[adjacent[0], adjacent[2]],
		[adjacent[1], adjacent[3]]
	];
	let keys = [
		[0, 2],
		[1, 3]
	];
	amount /= 2;

	for (let i = 0; i < 2; i++) {
		if (axis[i][0] == requirement && axis[i][1] == requirement && keyIntoActivation(keys[i][0], x, y) && keyIntoActivation(keys[i][1], x, y)) {
			count++;
		}
	}

	switch (type) {
		case "at least":
			return count >= amount;
		case "exactly":
			return count == amount;
		case "at most":
			return count <= amount;
	}
}

function parseTooltip(ruleSet) {
	let str = "Must be adjacent to";
	let bool = ruleSet.var == "||" ? "or" : "and";

	for (let i = 0; i < ruleSet.rules.length; i++) {
		rule = ruleSet.rules[i];
		if (i == ruleSet.rules.length - 1) {
			str += " " + bool + " ";
		} else if (i == 0) {
			str += " ";
		} else {
			str += ", ";
		}
		str += parseSubTooltip(rule);
	}

	str += ".";
	return str;
}

function parseSubTooltip(rule) {
	if (rule.type == "exactly" && rule.amount == 0) {
		return "absolutely zero " + planner.coilTypes[rule.requirement].displayName + "s";
	}
	let str = rule.type + " " + parsePrefix(rule.amount) + " " + planner.coilTypes[rule.requirement].displayName + parseSuffix(rule.amount);
	if (rule.axial) {
		str += " along a common axis";
	}
	return str;
}

function parsePrefix(amount) {
	switch (amount) {
		case 0:
			return "no";
		case 1:
			return "one";
		case 2:
			return "two";
		case 3:
			return "three";
		case 4:
			return "four";
	}
}

function parseSuffix(amount) {
	return amount == 1 ? "" : "s";
}
