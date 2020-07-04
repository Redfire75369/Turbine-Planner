function getDefaultData() {
  return {
    diameter: 3,
    length: 3,
    bearingDiameter: 1,

    rotors: [

    ]
  }
}

var planner = getDefaultData();

var rotors = {
  "none": new TurbineBlade("none", 1, 1, 1)
}
turbineSize(planner.diameter, planner.length);
