var portfolioApp = angular.module('portfolio', []);


portfolioApp.controller('weather-ctrl', weather);
portfolioApp.controller('profile-ctrl',
    function($scope, $http, $sce) {
        $scope.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    }
);
