function submitRotorConfig() {
	rotors["steel"].efficiency = parseFloat(document.getElementById("config_rotor_eff_steel").value);
	rotors["extreme"].efficiency = parseFloat(document.getElementById("config_rotor_eff_extreme").value);
	rotors["sicsiccmc"].efficiency = parseFloat(document.getElementById("config_rotor_eff_sicsiccmc").value);
	
	rotors["steel"].expansion = parseFloat(document.getElementById("config_rotor_exp_steel").value);
	rotors["extreme"].expansion = parseFloat(document.getElementById("config_rotor_exp_extreme").value);
	rotors["sicsiccmc"].expansion = parseFloat(document.getElementById("config_rotor_exp_sicsiccmc").value);
	rotors["stator"].expansion = parseFloat(document.getElementById("config_rotor_exp_stator").value);
}

function submitCoilConfig() {
	coils["magnesium"].efficiency = parseFloat(document.getElementById("config_coil_eff_magnesium").value);
	coils["beryllium"].efficiency = parseFloat(document.getElementById("config_coil_eff_beryllium").value);
	coils["aluminium"].efficiency = parseFloat(document.getElementById("config_coil_eff_aluminium").value);
	coils["gold"].efficiency = parseFloat(document.getElementById("config_coil_eff_gold").value);
	coils["copper"].efficiency = parseFloat(document.getElementById("config_coil_eff_copper").value);
	coils["silver"].efficiency = parseFloat(document.getElementById("config_coil_eff_silver").value);
}

function submitOtherConfig() {
	planner.config.turbine_power_per_mb[0] = parseFloat(document.getElementById("config_hps_rf").value);
	planner.config.turbine_power_per_mb[1] = parseFloat(document.getElementById("config_lps_rf").value);
	planner.config.turbine_power_per_mb[2] = parseFloat(document.getElementById("config_steam_rf").value);
	
	planner.config.ideal_total_expansion_level[0] = parseFloat(document.getElementById("config_hps_exp").value);
	planner.config.ideal_total_expansion_level[1] = parseFloat(document.getElementById("config_lps_exp").value);
	planner.config.ideal_total_expansion_level[2] = parseFloat(document.getElementById("config_steam_exp").value);
	
	planner.config.turbine_mb_per_blade = parseInt(document.getElementById("config_turbine_mb_per_blade").value);
	planner.config.turbine_throughput_efficiency_leniency = parseFloat(document.getElementById("config_throughput_eff_leniency").value);
	planner.config.turbine_tension_throughput_factor = parseFloat(document.getElementById("config_throughput_factor").value);
	planner.config.turbine_power_bonus_multiplier = parseFloat(document.getElementById("config_power_bonus").value);
}