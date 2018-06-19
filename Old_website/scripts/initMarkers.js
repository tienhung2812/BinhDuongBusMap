

function createBusMarkers() {	
// Begin Initializing the Markers, but not display them yet
	var script = document.createElement('script');			
	script.src = 'scripts/get_bus39_info.js';
	initMarkers(39,script);
	script.src = 'scripts/get_bus55_info.js';
	initMarkers(55,script);	
	script.src = 'scripts/get_bus51_info.js';
	initMarkers(51,script);
	script.src = 'scripts/get_bus66_info.js';
	initMarkers(66,script);
	script.src = 'scripts/get_bus67_info.js';
	initMarkers(67,script);
	script.src = 'scripts/get_bus68_info.js';
	initMarkers(68,script);
	// End Initializing the Markers
	
}

function initMarkers(busNumber,script) {	
	document.getElementsByTagName('head')[0].appendChild(script);
	var marker_map;		
	window.eqfeed_callback = function(results) {		
	for (var i = 0; i < results.features.length; i++) {					
		var coords = results.features[i].geometry.coordinates;
		// var image = 'images/bus_stop_icon.png';
		var image = 'images/bus-station.png';
		var latLng = new google.maps.LatLng(coords[0],coords[1]);
		var marker = new google.maps.Marker({
			scaledSize: new google.maps.Size(32, 32), // scaled size
			position: latLng,
			// map: map,
			icon : image,
			clickable: true
		});
		switch (busNumber) {
			case '39':
				bus39_markers.push(marker);		
				break;
			case '55':
				bus55_markers.push(marker);
				break;
			case '51':
				bus51_markers.push(marker);
				break;
			case '52':
				bus52_markers.push(marker);
				break;
			case '53':
				bus53_markers.push(marker);
				break;
			case '66':
				bus66_markers.push(marker);
				break;
			case '67':
				bus67_markers.push(marker);
				break;
			case '68':
				bus68_markers.push(marker);
				break;
		};
		// end switch statement
		
		marker.info = new google.maps.InfoWindow({
		  content: results.features[i].properties.name		 
		});
		
		google.maps.event.addListener(marker, 'click', function(event) {				
			marker_map = this.getMap();
			this.info.open(marker_map,this);
			var data = '{lat: '+event.latLng.lat()+', lng: '+event.latLng.lng()+'}';
			// Comment because only need when drawing
			var path = poly.getPath();
			path.push(event.latLng);				
		});
	}
	//end for loop 
	
	}
	// end eqfeed_callback function
}