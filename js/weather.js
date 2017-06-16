var weatherAPI;
var googleMapQuery;
var crossOrigin = "https://crossorigin.me/";
var darkskyKey = "7e06f9fa850f9c1b4945bea03285eef1";
// var geocodeApiKey = "AIzaSyAD22NFjqjHyeL38T66nqA478xTkG82V90";


function init() {
    weatherAPI = "https://api.darksky.net/forecast/";
    crossOrigin;
    googleMapQuery = "https://www.google.ca/maps/api/geocode/";
}

function weather($scope, $http, $sce) {
    init();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position){
            $scope.$apply(function(){
                console.log(position);
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                getLocalWeather(lat, lon, $scope, $http, $sce);
                getRegion(lat, lon, $scope, $http, $sce);
            });
        });
    }
}

function getLocalWeather(lat, lon, scope, http, sce) {
    scope.weather = {
        icon: "cloudy",
        summary: "cloudy",
        celsius: 17,
        fahrenheit: 50,
        unit: "celsius"
    }

    weatherAPI = sce.trustAsResourceUrl(
        (
            weatherAPI + darkskyKey
            + "/" + lat + "," + lon
        )
    );

    http.jsonp(weatherAPI).then(
        function (response) {
            var currentWeather = response.data.currently;
            var fahrenheit = currentWeather.temperature;
            var celsius = (fahrenheit - 32) * 5 / 9;
            var time = new Date(currentWeather.time * 1000);
            var hour = time.getHours();
            var dayTime = function() {
                return (6 <= hour < 18);
            }

            console.log(currentWeather);

            scope.weather["celsius"] = celsius;
            scope.weather["fahrenheit"] = fahrenheit;
            scope.weather["icon"] = currentWeather.icon;
            scope.weather["summary"] = currentWeather.summary;
        }
    );
}

function getRegion(lat, lon, scope, http, sce) {
    scope.location = {
        city: "Nanchang",
        region: "JX",
        country: "CN"
    }

    googleMapQuery += (
        "json?latlng=" + lat + "," + lon
    );
    googleMapQuery = sce.trustAsResourceUrl(googleMapQuery);

    http({
        method: "GET",
        url: googleMapQuery
    }).then(
        function (response) {
            var address = response.data.results[0].address_components;
            console.log(address);

            for (obj of address) {
                if (obj["types"][0] == "locality") {
                    scope.location["city"] = obj["short_name"];
                }
                if (obj["types"][0] == "administrative_area_level_1") {
                    scope.location["region"] = obj["short_name"];
                }
                if (obj["types"][0] == "country") {
                    scope.location["country"] = obj["short_name"];
                }
            }
        }
    );
}
