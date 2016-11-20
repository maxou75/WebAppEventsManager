$(document).ready(function() {

    initialize();
    var geocoder;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
    //Get the latitude and the longitude;
    function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng)
    }

    function errorFunction(){
        alert("Geocoder failed");
    }

    function initialize() {
        geocoder = new google.maps.Geocoder();
    }

    function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results)
                if (results[1]) {
                    //find country name
                    for (var i=0; i<results[0].address_components.length; i++) {
                        for (var b=0;b<results[0].address_components[i].types.length;b++) {
                            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                            if (results[0].address_components[i].types[b] == "administrative_area_level_3") {
                                //this is the object you are looking for
                                city= results[0].address_components[i];
                                break;
                            }
                        }
                    }
                    //city data
                    $("#userLocation").append("<u><b>" + city.long_name + "</u></b>");
                    console.log(city.long_name)

                } else {
                    $("#userLocation").append("No results found")
                    console.log("No results found for location");
                }
            } else {
                $("#userLocation").append("Error");
                console.log("Geocoder failed due to: " + status);
            }
        });
        }
});