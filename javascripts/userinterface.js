const turbine = document.getElementById("blades");

function updateUITurbine(diameter, length) {
  if (diameter < 3 || length < 3) {
    alert("Invalid Turbine Dimensions");
    return;
  }

  planner.diameter = diameter;
  planner.length =  length;

  turbine.children[0].innerHTML = "";
  planner.rotors = [];

  for (let i = 0; i < length + 2; i++) {
    let column = document.createElement("DIV");
    column.setAttribute("id", "turbine_col_" + i);
    column.setAttribute("class", "flex__col");
    turbine.children[0].append(column);

    if (i > 0 && i < length + 2) {
      planner.rotors[i - 1] = rotors["none"];
    }
    for (let j = 0; j < diameter + 2; j++) {
      let row = document.createElement("DIV");
      row.setAttribute("id", "turbine_row_" + j + "_" + i);
      row.setAttribute("class", "flex__row");
      document.getElementById("turbine_col_" + i).append(row);

      let box = document.createElement("DIV");
      box.setAttribute("id", "something");
      if (j == 0 || j == diameter + 1 || i == 0 || i == length + 1) {
        box.setAttribute("class", "turbinebox turbinecasing");
      } else if ((diameter % 2 == 1 && j == (diameter + 1) / 2) || (diameter % 2 == 0 && (j == diameter / 2 || j == (diameter + 2) / 2))) {
        box.setAttribute("class", "turbinebox turbineshaft")
      } else {
        box.setAttribute("class", "turbinebox");
      }
      document.getElementById("turbine_row_" + j + "_" + i).append(box);
    }
  }
}

function updateUIBearing(bearingDiameter) {
  if (planner.diameter % 2 == bearingDiameter % 2 && bearingDiameter + 2 <= planner.diameter) {
    planner.bearingDiameter = bearingDiameter;

    for (let i = 1; i < planner.length + 1; i++) {
      let start = planner.diameter % 2 == 0 ? planner.diameter / 2 - (bearingDiameter / 2) + 1 : (planner.diameter + 1) / 2 - (bearingDiameter + 1) / 2 + 1;

      for (let j = 1; j < planner.diameter + 1; j++) {
        if (j < start || j >= start + bearingDiameter) {
          document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinebox");
        } else {
          document.getElementById("turbine_row_" + j + "_" + i).children[0].setAttribute("class", "turbinebox turbineshaft");
        }
      }
    }
  } else {
    alert("Invalid Bearing Diameter")
  }
}

function updateUITurbineBlades {

}
