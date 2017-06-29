function getRandomQuote($scope, $http) {
    $scope.quote = {
        text: "Random quote",
        author: "hanabinoir"
    }

    var quoteAPI = "https://andruxnet-random-famous-quotes.p.mashape.com/cat=";
    var tweetBtn = angular.element(
        document.getElementsByClassName("twitter-share-button")
    );
    var tweetUrl = tweetBtn.attr('href');

    // quoteAPI = $sce.trustAsResourceUrl(quoteAPI);
    $http({
        url: quoteAPI,
        headers: {
             "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V"
        }
    }).then(
        function(response) {
            var quote = response.data;
            console.log(quote);
            $scope.quote.text = quote.quote;
            $scope.quote.author = quote.author;

            tweetUrl += $scope.quote.text + " @ " + $scope.quote.author;
            tweetBtn.attr('href', tweetUrl);
        }
    );
}
