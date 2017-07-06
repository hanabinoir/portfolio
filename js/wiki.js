function WikiSearch($scope, $http, $sce) {
    $scope.langs = [
        {
            value: "en",
            code: "en"
        },
        {
            value: "中",
            code: "zh-tw"
        },
        {
            value: "日",
            code: "ja"
        }
    ];
    $scope.lang = $scope.langs[1];

    var input = angular.element(
        document.querySelector("input#keywords")
    ),
    resultSummary = angular.element(
        document.querySelector("h4#result-summary")
    );


    var SearchKeywords = function () {
        var keywords = input.val(),
        // crossOrigin = "https://crossorigin.me/",
        endpoint = "https://" + $scope.lang.code + ".wikipedia.org",
        query = "/w/api.php?action=opensearch&format=json" +
        "&search=" + keywords;
        url = $sce.trustAsResourceUrl(endpoint + query)

        console.log(endpoint + query);

        $http.jsonp(url).then(
            function(response) {
                var wiki = response.data;

                console.log(wiki);
                $scope.wikiList = [];

                resultSummary.html(
                    wiki[1].length + " result(s) for \"" +
                    wiki[0] + "\""
                );

                for (var i = 0; i < wiki[1].length; i ++) {
                    $scope.wikiList.push({
                        title: wiki[1][i],
                        content: wiki[2][i],
                        link: wiki[3][i],
                    });
                }
            }
        );
    };

    $scope.search = SearchKeywords;
}
