var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 10.7289658, lng: 106.7057848},
    zoom: 15,
    disableDefaultUI: true
  });
  var geocoder = new google.maps.Geocoder();

  google.maps.event.addListener(map, 'click', function(event) {
    geocoder.geocode({
      'latLng': event.latLng
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
  });
  }