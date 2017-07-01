var weatherAPI;
var googleMapQuery;
var crossOrigin = "https://crossorigin.me/";
var darkskyKey = "7e06f9fa850f9c1b4945bea03285eef1";
// var geocodeApiKey = "AIzaSyAD22NFjqjHyeL38T66nqA478xTkG82V90";

function getWeather(scope, http, sce, latlng) {
    weatherAPI = "https://api.darksky.net/forecast/";

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
            + "/" + latlng.lat + "," + latlng.lng
        )
    );

    console.log(latlng);

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
            var weatherIcons = document.querySelectorAll('i#weather-icon')

            console.log(currentWeather);
            console.log(weatherIcon);

            scope.weather["celsius"] = celsius;
            scope.weather["fahrenheit"] = fahrenheit;
            scope.weather["icon"] = currentWeather.icon;
            scope.weather["summary"] = currentWeather.summary;

            for (icon of weatherIcons) {
                var weatherIcon = angular.element(icon);
                
                weatherIcon.attr('class', 'wi');

                if (dayTime) {
                    switch (currentWeather.icon) {
                        case "clear-day":
                            weatherIcon.addClass('wi-day-sunny')
                            break;
                        case "cloudy":
                            weatherIcon.addClass('wi-day-cloudy')
                            break;
                        case "partly-cloudy-day":
                            weatherIcon.addClass('wi-day-cloudy')
                            break;
                        case "rain":
                            weatherIcon.addClass('wi-day-rain')
                            break;
                        case "sleet":
                            weatherIcon.addClass('wi-day-sleet')
                            break;
                        case "fog":
                            weatherIcon.addClass('wi-day-fog')
                            break;
                        default:
                            weatherIcon.addClass('wi-day-hail')
                    }
                } else {
                    switch (currentWeather.icon) {
                        case "clear-night":
                            weatherIcon.addClass('wi-night-clear')
                            break;
                        case "cloudy":
                            weatherIcon.addClass('wi-night-cloudy')
                            break;
                        case "rain":
                            weatherIcon.addClass('wi-night-rain')
                            break;
                        case "partly-cloudy-night":
                            weatherIcon.addClass('wi-night-partly-cloudy')
                            break;
                        case "windy":
                            weatherIcon.addClass('wi-night-windy')
                            break;
                        case "fog":
                            weatherIcon.addClass('wi-night-fog')
                            break;
                        default:
                            weatherIcon.addClass('wi-night-hail')
                    }
                }
            }
        }
    );
}

function getRegion(scope, http, sce, latlng) {
    googleMapQuery = "https://www.google.ca/maps/api/geocode/";
    scope.location = {
        city: "Nanchang",
        region: "JX",
        country: "CN"
    }

    googleMapQuery += (
        "json?latlng=" + latlng.lat + "," + latlng.lng
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
