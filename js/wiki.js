function WikiSearch($scope) {
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
}
