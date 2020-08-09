function submitRotorConfig() {
	planner.rotorTypes["steel"].efficiency = parseFloat(document.getElementById("config_rotor_eff_steel").value);
	planner.rotorTypes["extreme"].efficiency = parseFloat(document.getElementById("config_rotor_eff_extreme").value);
	planner.rotorTypes["sic_sic_cmc"].efficiency = parseFloat(document.getElementById("config_rotor_eff_sic_sic_cmc").value);
	
	planner.rotorTypes["steel"].expansion = parseFloat(document.getElementById("config_rotor_exp_steel").value);
	planner.rotorTypes["extreme"].expansion = parseFloat(document.getElementById("config_rotor_exp_extreme").value);
	planner.rotorTypes["sic_sic_cmc"].expansion = parseFloat(document.getElementById("config_rotor_exp_sic_sic_cmc").value);
	planner.rotorTypes["stator"].expansion = parseFloat(document.getElementById("config_rotor_exp_stator").value);
}

function submitCoilConfig() {
	planner.coilTypes["magnesium"].efficiency = parseFloat(document.getElementById("config_coil_eff_magnesium").value);
	planner.coilTypes["beryllium"].efficiency = parseFloat(document.getElementById("config_coil_eff_beryllium").value);
	planner.coilTypes["aluminum"].efficiency = parseFloat(document.getElementById("config_coil_eff_aluminum").value);
	planner.coilTypes["gold"].efficiency = parseFloat(document.getElementById("config_coil_eff_gold").value);
	planner.coilTypes["copper"].efficiency = parseFloat(document.getElementById("config_coil_eff_copper").value);
	planner.coilTypes["silver"].efficiency = parseFloat(document.getElementById("config_coil_eff_silver").value);

	planner.coilTypes["magnesium"].ruleSet = parseRules(document.getElementById("config_coil_rule_magnesium").value);
	planner.coilTypes["beryllium"].ruleSet = parseRules(document.getElementById("config_coil_rule_beryllium").value);
	planner.coilTypes["aluminum"].ruleSet = parseRules(document.getElementById("config_coil_rule_aluminum").value);
	planner.coilTypes["gold"].ruleSet = parseRules(document.getElementById("config_coil_rule_gold").value);
	planner.coilTypes["copper"].ruleSet = parseRules(document.getElementById("config_coil_rule_copper").value);
	planner.coilTypes["silver"].ruleSet = parseRules(document.getElementById("config_coil_rule_silver").value);
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