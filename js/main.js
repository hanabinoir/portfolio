var portfolioApp = angular.module('portfolio', []);

portfolioApp.factory(
    "geocode",
    function ($q, $window, $rootScope) {
        return function() {
            var geocode = $q.defer();

            if (!$window.navigator) {
                $rootScope.$apply(function() {
                    console.log("Geolocation is not supported");
                });
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        $rootScope.$apply(function() {
                            var latlng = {};
                            latlng.lat = position.coords.latitude;
                            latlng.lng = position.coords.longitude;
                            geocode.resolve(latlng);
                        });
                    }
                );
            }
            return geocode.promise;
        }
    }
);

portfolioApp.controller(
    'weather-ctrl',
    function($scope, $http, $sce, geocode) {
        geocode().then(
            function(latlng) {
                getWeather($scope, $http, $sce, latlng)
            }
        );
    }
);

portfolioApp.controller(
    'region-ctrl',
    function($scope, $http, $sce, geocode) {
        geocode().then(
            function(latlng) {
                getRegion($scope, $http, $sce, latlng)
            }
        );
    }
);

portfolioApp.controller('profile-ctrl',
    function($scope, geocode) {
        geocode().then(
            function(latlng) {
                $scope.latlng = {};
                $scope.latlng.lat = latlng.lat;
                $scope.latlng.lng = latlng.lng;

            }
        );
    }
);

portfolioApp.controller(
    'quote-ctrl',
    function($scope, $http, $sce) {
        $scope.quote = {
            text: "Random quote",
            author: "hanabinoir"
        }

        var quoteAPI = "http://quotesondesign.com/wp-json/posts?" + "filter[orderby]=rand&filter[posts_per_page]=1&callback=?";
        var tweetBtn = angular.element(
            document.getElementsByClassName("twitter-share-button")
        );
        var tweetUrl = tweetBtn.attr('href');

        $http({
            method: "GET",
            url: quoteAPI
        }).then(
            function(response) {
                var quote = response.data;
                console.log(quote);
            }
        );

        tweetUrl += $scope.quote.text + " @ " + $scope.quote.author;
        tweetBtn.attr('href', tweetUrl);
    }
);
