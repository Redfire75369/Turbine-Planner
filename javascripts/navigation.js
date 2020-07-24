function showNaviTab(tab) {
	document.getElementById(planner.navigation).style.display = "none";
	document.getElementById(tab).style.display = "block";
	document.getElementById(planner.navigation + "_navibtn").className = "navibtn";
	document.getElementById(tab + "_navibtn").className = "navibtn active";
	planner.navigation = tab;
}
