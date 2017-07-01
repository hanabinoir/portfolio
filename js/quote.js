function RandomQuote($scope, $http) {
    $scope.quote = {
        "text": "Random quote",
        "author": "hanabinoir"
    };
    $scope.generate = function() {
        var quoteAPI = "https://andruxnet-random-famous-quotes.p.mashape.com/cat=";

        $http({
            headers: {
              "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V"
            },
            url: quoteAPI
        }).then(
            function(response) {
                var quote = response.data;
                var tweet = angular.element(
                    document.querySelector('#tweet')
                );
                var query = "https://twitter.com/intent/tweet?text=";

                $scope.quote.text = quote.quote;
                $scope.quote.author = quote.author;
                query += (
                    $scope.quote.text + "%20--%20" +
                    $scope.quote.author + "%20%20@hanabinoir"
                );

                tweet.attr('href', query);
            }
        );
    };

    $scope.generate();
}
