function showNaviTab(tab) {
	document.getElementById(planner.navigation).style.display = "none";
	document.getElementById(tab).style.display = "block";
	document.getElementById(planner.navigation + "_navibtn").className = "navitabbtn";
	document.getElementById(tab + "_navibtn").className = "navitabbtn active";
	planner.navigation = tab;
}
