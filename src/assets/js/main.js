$(document).ready(function () {
    
});

var runTripBtn = $("#run-trip");
var newTrip = $("#newTrip");
var geoBTN = $("#geoBTN");
var points2 = '';
var pointsArr = new Array();
var setMapToOrg = $("#setMapToOrg")
var setMapToDest = $("#setMapToDest")
var frameTrip = $("#frameTrip")



$("#run-trip").click(function (){
    seemyLoading()
    });

function seemyLoading(){     
       document.getElementById("spinner").style.visibility = "visible";
    }

function hideLoading(){     
        document.getElementById("spinner").style.visibility = "hidden";
     }


function setOriginToCurrentLocation() {
   var b = $("#SetToCurrentLocation").is(":checked");

   if (!b) {
       $("#origin").val("");

   } else if (navigator.geolocation) {
       var options = {
           maximumAge: 0,
           timeout:30000,
           enableHighAccuracy: true};
       navigator.geolocation.getCurrentPosition(success, error, [options]);

   } else {
       alert("HTML5 Not supported");
   }
}
function error(err) {
   console.warn(`ERROR(${err.code}): ${err.message}`);
}
 function success(position) {
   var lat = position.coords.latitude;
   var lon = position.coords.longitude;
   $("#origin").val(lat + ':' + lon);

}
/* When document is loaded fully...
****************************************/


$("#SetToCurrentLocation").on("change", function () {
   setOriginToCurrentLocation();
});



$(runTripBtn).click(function () {
   runFullTrip(); 
});

 


$(setMapToOrg).click(function(){
    frameOrigin ();
});

$(setMapToDest).click(function(){
    frameDestination();
});

$(frameTrip).click(function(){
    frameTheTrip();
});
function runFullTrip() {
    var origin = null;
    var originText = $('#origin').val();
   if(originText.indexOf(':') > -1) {
       var arr = originText.split(':');
       var lat = Number(arr[0]);
       var lon = Number(arr[1]);
       origin = new PRIMEWebAPI.TripLeg({ latitude: lat, longitude: lon });
   }
   else {
       origin = new PRIMEWebAPI.TripLeg({ locationText: $('#origin').val() });
   }
    var stop1 = new PRIMEWebAPI.TripLeg({ locationText: $('#stop1').val() });


   var arr = [];
   arr.push(origin);


   if ($('#origin').val() != '') {
       arr.push(stop1)
   }
   //if ($('#stop1').val() != '') {
   //    arr.push(stop1)
  //}
   //if ($('#stop3').val() != '') {
     //  arr.push(stop3)
   //}
   // if ($('#stop4').val() != '') {
      // arr.push(stop4)
   //}
   var myRtMethod = $('#rtMethod').change(function () {
       var selectedOption = $('#rtMethod option:selected');
       $('#myRtMethod').html('RtMethod = ' + selectedOption.val());
   });

   var fo = new PRIMEWebAPI.FuelOptimizationOptions({
       unitMPG: $('#setMPG').val(),
       unitTankCapacity: $('#setTankCapacity').val(),
       startGallons: $('#setStartGallon').val(),
       desiredEndGallons: $('#setDesiredEndGallon').val(),
       distanceOOR: $('#setDistanceOOR').val(),
       minimumGallonsToPurchase: $('#setMinGallons').val(),
       minimumTankGallonsDesired: $('#setMinTankGallons').val()
   });

   var closeBorder = $("#CloseBorder").prop("checked");
   var isHazmat = $("#IsHazmat").prop("checked");
   var avoidToll = $("#AvoidToll").prop("checked");
   var trip = new PRIMEWebAPI.Trip(
       {
           tripLegs: arr,
           routingMethod: PRIMEWebAPI.RoutingMethods.PRACTICAL,
           borderOpen: !closeBorder,
           avoidTollRoads: avoidToll,
           vehicleType: PRIMEWebAPI.VehicleTypes.TRACTOR3AXLETRAILER2AXLE,
           getDrivingDirections: true,
           getMapPoints: true,
           getStateMileage: true,
           getTripSummary: true,
           getFuelOptimization: true,
           getTruckStopsOnRoute: true,
           fuelOptimizationParameters: fo,
           isHazmat: isHazmat,
           unitMPG: 5
       });



   var rtMet = $('#rtMethod').val();
   //alert(test)

   if (rtMet == 'SHORTEST') {
       trip.routingMethod = PRIMEWebAPI.RoutingMethods.SHORTEST
   } else if (rtMet == "INTERSTATE") {
       trip.routingMethod = PRIMEWebAPI.RoutingMethods.INTERSTATE
   }

   PRIMEWebAPI.runTrip(trip, handleTrip);

};

function frameOrigin(){
    if (map !== undefined) {
        //bounds = new google.maps.LatLngBounds();
        if(points !== undefined && points !== null){
            if (points.length >= 1) {
                
                //map.fitBounds(bounds);
                var origin = points[0];
            map.setZoom(15);
            map.panTo(origin);
            } else {
                //sbounds.extend(points[0].latLng);
            }
        } else { //no locations so center
            
        }  
                  
    }
};

function frameDestination(){
    if (map !== undefined) {
        //bounds = new google.maps.LatLngBounds();
        if(points !== undefined && points !== null){
            if (points.length >= 1) {
                //map.fitBounds(bounds);
                var destination = points[points.length - 1];
            map.setZoom(10);
            map.panTo(destination);
            } else {
                //sbounds.extend(points[0].latLng);
            }
        } else { //no locations so center
            
        }  
                  
    }
}

function frameTheTrip(){
    if (map !== undefined) {
        //bounds = new google.maps.LatLngBounds();
        if(points !== undefined && points !== null){
            if (points.length > 1) {
                points.forEach(function (loc) {
                    //var ll = new google.maps.LatLng(loc.lat(), loc.lng());
                    bounds.extend(loc);
                    //console.log('frameTrip: ' + loc.latitude() + ', ' + loc.longitude());
                });
                map.fitBounds(bounds);
            } else {
                bounds.extend(points[0].latLng);
            }
        } else { //no locations so center
            var centerUS = new google.maps.LatLng(39.8282, -98.5795);
            map.setZoom(4);
            map.panTo(centerUS);
        } 
        
    }  
}
//function runFullTripGPS()
function runFullTripDetails() {
   var olat = Number($("#OLat").val());
   var olon = Number($("#OLon").val());

  
   var origin = new PRIMEWebAPI.TripLeg({ latitude: olat, longitude: olon });
  
   var arr = [];
   arr.push(origin);
   arr.push(destination);
      
       var closeBorder = $("#CloseBorder").prop("checked");
       var isHazmat = $("#IsHazmat").prop("checked");
       var avoidToll = $("#AvoidToll").prop("checked");
       var mpg = ($("#setMPG").val());
      
       var fo = new PRIMEWebAPI.FuelOptimizationOptions({
           unitMPG: mpg,
           unitTankCapacity: 180,
           startGallons: 150,
           desiredEndGallons: 25,
           distanceOOR: 4,
           minimumGallonsToPurchase: 50,
           minimumTankGallonsDesired: 20
       });
      
      
       var trip = new PRIMEWebAPI.Trip(
           {
               tripLegs: arr,
               routingMethod: PRIMEWebAPI.RoutingMethods.SHORTEST,
               borderOpen: !closeBorder,
               avoidTollRoads: avoidToll,
               vehicleType: PRIMEWebAPI.VehicleTypes.TRACTOR3AXLETRAILER2AXLE,
               getDrivingDirections: true,
               getMapPoints: true,
               getStateMileage: false,
               getTripSummary: true,
               getFuelOptimization: false,
               getTruckStopsOnRoute: false,
               fuelOptimizationParameters: fo,
               unitMPG: mpg
           });
          
           PRIMEWebAPI.runTrip(trip, handleTrip);
}
      
       //trip time in hours and seconds
function getTimeString(n, isSeconds) {
      
           if (isSeconds) n = Math.ceil(n / 60); ;
      
           var hours = (n < 60) ? 0 : Math.floor(n / 60);
      
           var minutes = n % 60;
      
           hours = hours.toString();
      
           if (hours.length == 1) hours = "0" + hours;
      
           minutes = minutes.toString();
      
           if (minutes.length == 1) minutes = "0" + minutes;
      
       
      
           return hours + "h:" + minutes + "m";
           
        }

 function handleTrip(t) {
           var times = getTimeString(t.TripMinutes)
           var html = [];
           html.push("<h2>Trip Summary</h2>");
           html.push("<b>" + t.OriginLabel + "</b> to <b>" + t.DestinationLabel + "</b><br/>");
           html.push("<b>Trip Miles:</b> " + t.TripDistance + "<br/>");

           html.push("<b>Trip Time:</b> " + times + "<br/>");
           html.push("<b>Average Retail:</b> " + t.AverageRetailPricePerGallon + "<br/>");
           html.push("<br/><br/>");
          
           html.push("</tbody></table>");

        var oLat  = t.MapPoints[0].Lat;
        var oLon  = t.MapPoints[0].Lon;
        var dLat  = t.MapPoints[t.MapPoints.length - 1].Lat;
        var dLon  = t.MapPoints[t.MapPoints.length - 1].Lon;
        if(markerOrg != null && markerOrg != undefined){
            markerOrg.setMap(null);
        }
        if(markerDest != null && markerDest != undefined){
            markerDest.setMap(null);
        }
           markerOrg = new google.maps.Marker({
                position: new google.maps.LatLng(oLat, oLon),
                title: t.OriginLabel,
                map: map
            });
            bounds.extend(markerOrg.position);


            markerDest = new google.maps.Marker({
                position: new google.maps.LatLng(dLat, dLon),
                title: t.DestinationLabel,
                map: map
            });


            // var polyline = new google.maps.Polyline()
            if (polyline !== undefined && polyline !== null  && map!== null && map !== undefined) {
                polyline.setMap(null);
            }                           
            bounds = new google.maps.LatLngBounds();

            points = new Array();
            t.MapPoints.forEach(function (point, i) {
                var pt = new google.maps.LatLng(point.Lat, point.Lon);
                points.push(pt);
                bounds.extend(pt);
            });
            polyline = new google.maps.Polyline({
                path: points,
                editable: false,
                draggable: false,
                strokeColor: '#ed1c24 ',
                strokeWeight: 3,
                map: map
            });
            map.fitBounds(bounds);
            
                
   //DRIVING DIRECTIONS
   html.push("<br/><br/><h2>Driving Directions</h2>");
   html.push("<table><thead><tr><th>State</th><th>Maneuver</th><th>Leg Miles</th><th>Total Miles</th></tr></thead><tbody>")
   for (var i = 0; i < t.DrivingDirections.length; i++) {
       var dd = t.DrivingDirections[i];
       html.push("<tr><td>" + dd.State + "</td><td>" + dd.Maneuver + "</td><td>" + dd.LegMiles + "</td><td>" + dd.DistanceAtStart + "</td></tr>");
   }
   html.push("</tbody></table>");

   $('#tMiles').html("Miles: " + "<span style=color:#ed1c24>" + t.TripDistance + "</span>" + "<br />" );
   

   $('#FullTripResults').html(html.join(''));
  
   //t.MapPoints.array.forEach(element => {
   //   
   //});

    // function getRoute(end){
    //     var start = [-122.66232372860946,45.52375169876174];
    //     var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + ';' + end[0] + ',' + end[1] + 'geometries=geojson&access_token=' + map;
    //     var req = new XMLHttpRequest();
    //     req.responseType = 'json';
    //     req.open('GET', url, true);
    //     req.onload  = function() {
    //         var data = req.response.routes[0];
    //         var route = data.geometry.coordinates;
    //         var geojson = {
    //             "type": "Feature",
    //             "properties": {},
    //             "geometry": {
    //                 "type": "LineString",
    //                 "coordinates": route
    //             }
    //         }; 
    //     }
    // }
    //function handletrip ends  
    hideLoading();
}


