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

portfolioApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

portfolioApp.controller(
    'weather-ctrl',
    function($scope, $http, $sce, geocode) {
        geocode().then(
            function(latlng) {
                Weather($scope, $http, $sce, latlng)
            }
        );
    }
);

portfolioApp.controller(
    'region-ctrl',
    function($scope, $http, $sce, geocode) {
        geocode().then(
            function(latlng) {
                Region($scope, $http, $sce, latlng)
            }
        );
    }
);

portfolioApp.controller(
    'quote-ctrl',
    RandomQuote
);

portfolioApp.controller(
    'social-links-ctrl',
    SocialLinks
);

portfolioApp.controller(
    'summary-ctrl',
    Summary
);

portfolioApp.controller(
    'wiki-ctrl',
    WikiSearch
);

portfolioApp.controller(
    'stream-ctrl',
    TwitchStream
);
