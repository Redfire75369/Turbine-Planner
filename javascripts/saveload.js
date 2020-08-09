function getSaveString() {
	return LZString.compressToBase64(JSON.stringify(planner));
}

function getSave() {
	if (localStorage.getItem("NCOTurbinePlannerSave") !== null) {
		return localStorage.getItem("NCOTurbinePlannerSave");
	} else {
		return "";
	}
}
function saveGame() {
	try {
		localStorage.setItem("NCOTurbinePlannerSave", getSaveString());
	} catch(err) {
		console.log(err);
		console.log("Game failed to save");
	}
}

function importSave() {
	let save = prompt("Input your save. WARNING: Your current save file will be overwritten.");
	if (save === null) {
		return;
	}
	preLoad();
	loadSave(save, true);
	postLoad();
	saveGame();
}
function exportSave() {
	saveGame();
	copyStringToClipboard(getSaveString());
	alert("Save copied to clipboard");
}

function hardReset() {
	let confirmation = prompt("This will completely reset your settings. If you are sure, type in “NuclearCraft Turbine Planner”");
	if (confirmation == "NuclearCraft Turbine Planner") {
		player = getDefaultData();
		saveGame();
		preLoad();
		loadSave();
		postLoad();
	}
}

function loadSave(save, imported = false) {
	try {
		if (save === undefined) {
			save = getSave();
		}

		save.trim();

		if (save.startsWith("ey")) {
			save = JSON.parse(atob(save));
		} else {
			save = JSON.parse(LZString.decompressFromBase64(save));
		}

		if (save !== undefined) {
			checkAssign(getDefaultData(), save, []);

			planner.version = getDefaultData().version;
		} else {
			console.log("No existing save found");
		}
		if (imported) {
			alert("Save imported successfully.");
		}
	} catch(err) {
		console.log(err);
		if (imported) {
			alert("Error: Imported save is in an invalid format, please make sure you've copied the save correctly and aren't just typing gibberish.");
		} else {
			console.log("The save didn't load.");
		}
	}
}

function checkAssign(check, assignFrom, assignTo = []) {
	if (assignFrom !== undefined) {
		if (check instanceof Array) {
			for (let i = 0; i < assignFrom.length; i++) {
				checkAssign(check[i], assignFrom[i], assignTo.concat([i]));
			}
		} else if (typeof check == "object" && !checkObj(check)) {
			for (let i = 0, ii = Object.keys(check); i < ii.length; i++) {
				checkAssign(check[ii[i]], assignFrom[ii[i]], assignTo.concat([ii[i]]));
			}
		} else {
			let output = planner;
			let type = getDefaultData();
			for (let i = 0; i < assignTo.length - 1; i++) {
				output = output[assignTo[i]];
				type = type[assignTo[i]];
			}
			output[assignTo[assignTo.length - 1]] = objectify(assignFrom, type[assignTo[assignTo.length - 1]]);
		}
	} else {
		let output = planner;
		let def = getDefaultData();
		for (let i = 0; i < assignTo.length - 1; i++) {
			output = output[assignTo[i]];
			def = def[assignTo[i]];
		}
		output[assignTo[assignTo.length - 1]] = def;
	}
}

function checkObj(obj) {
	return obj instanceof TurbineBlade || obj instanceof DynamoCoil || obj instanceof DynamoCoilRuleSet;
}

function objectify(x, type) {
	if (type instanceof TurbineBlade) {
		return new TurbineBlade(x.name, x.efficiency, x.expansion, x.displayName);
	} else if (type instanceof DynamoCoil) {
		return new DynamoCoil(x.name, x.efficiency, objectify(x.ruleSet, type.ruleSet), x.displayName);
	} else if (type instanceof DynamoCoilRuleSet) {
		let ret = new DynamoCoilRuleSet();
		ret.rules = x.rules;
		ret.var = x.var;
		return ret;
	} else {
		return x;
	}
}
