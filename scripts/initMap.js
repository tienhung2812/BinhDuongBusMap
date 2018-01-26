var infoWindow;
var path;
var startPoint;
var endPoint;
var startMarker;
var endMarker;
var myLocation;
var bus_markers = [];

function initMap() {			
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: new google.maps.LatLng(11.058186, 106.6837316),
		mapTypeId: 'roadmap',
		zoomControl: true		
	});
	poly = new google.maps.Polyline({
			  strokeColor: '#ff0000',
			  strokeOpacity: 0.6,
			  strokeWeight: 4,			  
			});
	startMarker = new google.maps.Marker();
	endMarker = new google.maps.Marker();			
	poly.setMap(map);	
	// Add a listener for the click event
	// These are for drawing a bus route, just click on the map to drawing
	// If a part of path needs to be deleted, click on the current drawn line
	// Finally, right click to save to a file
	// map.addListener('click', addLatLng);	
	// poly.addListener('click', removeLatLng);	
	// only when need to draw new route
	// If rightclick on the map, a popup wil be shown and user can save a recent drawn bus route path
	// google.maps.event.addListener(map, "rightclick", function(event) {
	// 	download('bus_data.txt', path.getArray());			
	// });	
	
	google.maps.event.addListener(map, "rightclick",function(event){showContextMenu(event.latLng);});
	google.maps.event.addListener(map, 'click', function() {$('.contextmenu').remove();});	
	var count = 1; // count number of time that a user click
	google.maps.event.addListener(map, 'click', function(event) {		
			myLocation = event.latLng;
			if (count == 1) { 
				addStartPoint();
				count = 2;
			}
			else if (count ==2) { 
				addDestPoint();
				count = 3;
			}
	});
				
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
	};

	document.getElementById('search-btn').onclick = function myfunct() {
		calculateAndDisplayRoute(directionsService, directionsDisplay);
	}

	initAllMarkers();		
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

function getCanvasXY(caurrentLatLng){
	var scale = Math.pow(2, map.getZoom());
	var nw = new google.maps.LatLng(
	 map.getBounds().getNorthEast().lat(),
	 map.getBounds().getSouthWest().lng()
	);
	var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
	var worldCoordinate = map.getProjection().fromLatLngToPoint(caurrentLatLng);
	var caurrentLatLngOffset = new google.maps.Point(
	 Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
	 Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
	);
	return caurrentLatLngOffset;
}
function setMenuXY(caurrentLatLng){
	var mapWidth = $('#map').width();
	var mapHeight = $('#map').height();
	var menuWidth = $('.contextmenu').width();
	var menuHeight = $('.contextmenu').height();
	var clickedPosition = getCanvasXY(caurrentLatLng);
	var x = clickedPosition.x ;
	var y = clickedPosition.y ;

	if((mapWidth - x ) < menuWidth)
	 x = x - menuWidth;
	if((mapHeight - y ) < menuHeight)
	y = y - menuHeight;

	$('.contextmenu').css('left',x  );
	$('.contextmenu').css('top',y );
};

function showContextMenu(caurrentLatLng  ) {	
	// marker = new google.maps.Marker({
		// position: caurrentLatLng,
		// map: map,		
	// });	
	myLocation = caurrentLatLng;
	var projection;
	var contextmenuDir;
	projection = map.getProjection() ;
	$('.contextmenu').remove();
	contextmenuDir = document.createElement("div");
	contextmenuDir.className  = 'contextmenu';
	contextmenuDir.innerHTML = "\
		<menu id='menu1' onclick='addStartPoint()'> \
		<div class=\"context1\">Add starting point<\/div><\/menu>\
		<menu id='menu2' onclick='addDestPoint()'>\
		<div class=\"context2\">Add destination point<\/div>\
		<\/menu>";	 
	$(map.getDiv()).append(contextmenuDir);
	setMenuXY(caurrentLatLng);
	contextmenuDir.style.visibility = "visible";
	
	
};

function addStartPoint() {	
	startPoint	 = myLocation;
	startMarker.setMap(map);
	startMarker.setPosition(startPoint);
	var geocoder = new google.maps.Geocoder();	
    geocoder.geocode({
      'latLng': startPoint
    }, function(results, status) {
	
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].location
              });
            document.getElementById("starting-point").setAttribute('value',results[0].formatted_address );
        }
      }
    });		
};

function addDestPoint() {
	endPoint = myLocation;
	endMarker.setMap(map);
	endMarker.setPosition(endPoint);
	var geocoder = new google.maps.Geocoder();	
    geocoder.geocode({
      'latLng': endPoint
    }, function(results, status) {
	
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].location
              });
            document.getElementById("destination-point").setAttribute('value',results[0].formatted_address );
        }
      }
    });	
};

 function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	endMarker.setMap(null);
	startMarker.setMap(null);
	//Find the nearest markers-bus stops
		// console.log(google.maps.geometry.spherical.computeDistanceBetween(startPoint, endPoint));
	// Closest Marker from the Start point
	var closestMarker1 = findClosestN(startPoint, 1);
	var waypts1 = [];
	waypts1.push({
		location: closestMarker1[0].getPosition(),
		stopover: true
	});
	
	// Closest Marker from the Destination point
	var closestMarker2 = findClosestN(endPoint, 1);
	var waypts2 = [];
	waypts2.push({
		location: closestMarker2[0].getPosition(),
		stopover: true
	});
	directionsService.route({
	  origin: startPoint,
	  waypoints: waypts1,
	  destination: endPoint,
	  travelMode: 'WALKING'
	}, function(response, status) {
	  if (status === 'OK') {
		directionsDisplay.setDirections(response);
		
	  } else {
		window.alert('Directions request failed due to ' + status);
	  }
	});
 };
 
 function findClosestN(pt, numberOfResults) {
    var closest = [];
    for (var i = 0; i < bus_markers.length; i++) {
        bus_markers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, bus_markers[i].getPosition());
        // bus_markers[i].setMap(null);
        closest.push(bus_markers[i]);
    }
    closest.sort(sortByDist);	
    return closest.splice(0,numberOfResults);
}

function sortByDist(a, b) {
    return (a.distance - b.distance)
}

function initAllMarkers() {
	var script = document.createElement('script');
	script.src = 'scripts/get_allBus_info.js';
	document.getElementsByTagName('head')[0].appendChild(script);
	var marker_map;		
	window.eqfeed_callback = function(results) {		
	for (var i = 0; i < results.features.length; i++) {
		var coords = results.features[i].geometry.coordinates;
		var stations = results.features[i].properties.bus_routes;
		// var image = 'images/bus_stop_icon.png';
		var image = 'images/bus-station.png';
		var latLng = new google.maps.LatLng(coords[0],coords[1]);
		var marker = new google.maps.Marker({
			scaledSize: new google.maps.Size(32, 32), // scaled size
			position: latLng,
			map: map,
			icon : image,
			clickable: true
		});
		// console.log('data: '+data.properties);		
		bus_markers.push(marker);
		marker.info = new google.maps.InfoWindow({
		  content: "Trạm dừng: " + results.features[i].properties.name + 
					"<br>Các tuyến: "+ results.features[i].properties.bus_routes
		});
		
		google.maps.event.addListener(marker, 'click', function(event) {				
			marker_map = this.getMap();
			this.info.open(marker_map,this);
			var data = '{lat: '+event.latLng.lat()+', lng: '+event.latLng.lng()+'}';
			// Comment because only need when drawing new path
			// var path = poly.getPath();
			// path.push(event.latLng);				
		});
	}
	//end for loop 
	}
		
}