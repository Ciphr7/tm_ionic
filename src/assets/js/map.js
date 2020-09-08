

  // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var polyline;
      var map, infoWindow;
      var bounds;
      var points;
      var markerOrg;
      var markerDest;
      var marker;
      function initMap() {
        map = new google.maps.Map(document.getElementById('main'), {
          center: {lat: 39.8282, lng: -98.5795},
          zoom: 4,
          gestureHandling: 'greedy'
        });
        infoWindow = new google.maps.InfoWindow;
        bounds = new google.maps.LatLngBounds();

        // Try HTML5 geolocation.
        if(window.location.href.indexOf("https") > -1){
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              marker = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat, pos.lng),
                //title: t.OriginLabel,
                map: map,
                animation: google.maps.Animation.DROP,
                
            });
            // marker.addListener('click', toggleBounce);



              // infoWindow.setPosition(pos);
              // infoWindow.setContent('You are here!');
              // infoWindow.open(map);
              map.setCenter(pos);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            var centerUS = new google.maps.LatLng(39.8282, -98.5795);
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }

        } else {
          

        }
      } //end initMap

      function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, centerUS) {
        infoWindow.setPosition(centerUS);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }