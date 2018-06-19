 var map;
 
 function initMap() {
	var locations = [
		{'lat': 11.0532069, 'lng': 106.6684971},
		{'lat': 11.052979, 'lng': 106.6660807},
		{'lat': 11.0532069, 'lng': 106.6684971},
		{'lat': 11.0569472, 'lng': 106.6754108},
		{'lat': 11.0581784, 'lng': 106.6811826},
		{'lat': 11.0587679, 'lng': 106.6835279},
		{'lat': 11.0565033, 'lng': 106.6841219}
	];		
	
	var defaultLoc = {'lat': 11.0532069, 'lng': 106.6684971};
	
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: defaultLoc,
	  gestureHandling: 'greedy'
	});
	
		
	for (i=0; i<locations.length; i++) {
		var marker = new google.maps.Marker({
			  position: locations[i],
			  map: map
			});	
	}  
 }

