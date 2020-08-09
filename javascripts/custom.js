function newRotor(name, efficiency, expansion, displayName, colour = "#ffffff") {
	planner.rotorTypes[name] = new TurbineBlade(name, efficiency, expansion, displayName);
	planner.customRotorColours[name] = colour;

	newRotorSelection(name, colour);
}

function newRotorSelection(name, colour = "#ffffff") {
	document.getElementById("customstyles").sheet.insertRule(".turbinerotor." + name + "{ background-color: " + colour + "}");

	let selectionElement = document.createElement("DIV");
	selectionElement.setAttribute("onclick", "selectRotor('" + name + "')");
	selectionElement.setAttribute("id", "coil_" + name);
	selectionElement.setAttribute("class", "tooltip turbinebox border ");
	let rotor = document.createElement("DIV");
	rotor.setAttribute("id", "rotor_" + name);
	rotor.setAttribute("class", "turbinerotor selection " + name);
	selectionElement.append(rotor);
	let span = document.createElement("SPAN");
	span.setAttribute("class", "tooltiptext turbine");
	span.innerHTML = planner.rotorTypes[name].displayName + "<br/>Efficiency: <span id=\"rotor_eff_" + name + "\"></span>%<br/>Expansion: <span id=\"rotor_exp_" + name + "\"></span>%";
	selectionElement.append(span);
	document.getElementById("blades").children[2].append(selectionElement);
}


function newCoil(name, efficiency, rules, displayName, colour = "#ffffff") {
	planner.coilTypes[name] = new DynamoCoil(name, efficiency, parseRules(rules), displayName);
	planner.customCoilColours[name] = colour;

	newCoilSelection(name, colour);
}

function newCoilSelection(name, colour = "#ffffff") {
	document.getElementById("customstyles").sheet.insertRule(".turbinecoil." + name + " { background-color: " + colour + "}");

	let selectionElement = document.createElement("DIV");
	selectionElement.setAttribute("onclick", "selectCoil('" + name + "')");
	selectionElement.setAttribute("id", "coil_" + name);
	selectionElement.setAttribute("class", "flex__col tooltip turbinebox turbinecoil border " + name);
	let span = document.createElement("SPAN");
	span.setAttribute("class", "tooltiptext turbine");
	span.innerHTML = planner.coilTypes[name].displayName + "<br/>" + "Efficiency: <span id=\"coil_eff_"+ name + "\"></span>%<br/><span id=\"coil_rule_" + name + "\"></span>";
	selectionElement.append(span);
	document.getElementById("coils").children[2].append(selectionElement);
}
