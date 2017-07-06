function TwitchStream($scope, $http, $sce, $q) {
    $scope.channels = [];

    var followsAPI =
    "https://wind-bow.glitch.me/twitch-api/users" +
    "/freecodecamp/follows/channels",

    CheckChannelStatus = function(streamAPI) {
        $http.get(streamAPI + channel.name).then(
            function (response) {
                data = response.data;
                if (data.stream == null) {
                    channel.status = "offline";
                } else {
                    channel.status = data.stream.channel.status;
                }
            }
        );
    }

    followsAPI = $sce.trustAsResourceUrl(followsAPI);

    $http.jsonp(followsAPI).then(
        function(response) {
            var follows = response.data.follows;
            for (var i = 0; i < follows.length; i ++) {
                var channel = follows[i].channel,
                streamAPI = "https://wind-bow.glitch.me/twitch-api/streams/";

                if (channel.status == null) {
                    channel.status = "offline";
                } else {
                    $http.get(streamAPI + channel.name).then(
                        function (response) {
                            data = response.data;
                            if (data.stream == null) {
                                channel.status = "offline";
                            } else {
                                channel.status = data.stream.channel.status;
                            }
                        }
                    );
                }

                $scope.channels.push({
                    name: channel.name,
                    display_name: channel.display_name,
                    logo: channel.logo,
                    url: channel.url,
                    status: channel.status
                });
            }
        },
        failCallbacks
    );
    console.log($scope.channels);
}

function failCallbacks(response) {
    console.log(response);
}

function FindChannel() {
    var channelAPI = "https://wind-bow.glitch.me/twitch-api/channels/",
    streamAPI = "https://wind-bow.glitch.me/twitch-api/streams/",
    userAPI = "https://wind-bow.glitch.me/twitch-api/users/",
    input = angular.element(
        document.querySelector("input#channel");
    ),
    channel = input.val();
}
