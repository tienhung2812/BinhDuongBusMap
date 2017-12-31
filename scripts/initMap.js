var map;
var infoWindow;
var path;

function initMap() {			
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: new google.maps.LatLng(11.058186, 106.6837316),
		mapTypeId: 'roadmap'
	});
	// //call a script that create bus route paths	
	// var script = document.createElement('script');
	// script.src = 'scripts/get_bus68_info.js';	
	// document.getElementsByTagName('head')[0].appendChild(script);
	// a polyline that represents a route path of a bus route
	poly = new google.maps.Polyline({
			  // path :  pinkLinePath, //set path to display on the map
			  strokeColor: '#ff0000',
			  strokeOpacity: 1.0,
			  strokeWeight: 3
			});
	poly.setMap(map);	
	// Add a listener for the click event
	// These are for drawing a bus route, just click on the map to drawing
	// If a part of path needs to be deleted, click on the current drawn line
	// Finally, right click to save to a file
	// map.addListener('click', addLatLng);		
	// poly.addListener('click', removeLatLng);
}

 // Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
	path = poly.getPath();
	path.push(event.latLng);	
}

function removeLatLng(event) {
	path = poly.getPath();
	path.pop();
	path.pop();	
}



