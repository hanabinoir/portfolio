function TwitchStream($scope, $http, $sce, $q) {
    $scope.findChannel = function() {
        FindChannel($scope, $http, $sce, $q);
    }
    $scope.fccFollows = function() {
        FccFollows($scope, $http, $sce, $q);
    }

    $scope.fccFollows();
}

function failCallbacks(response) {
    console.log(response.data.msg);
}

function CheckChannelStatus(streamAPI, http, q) {
    var status = q.defer();

    http.get(streamAPI + channel.name).then(
        function (response) {
            data = response.data;
            if (data.stream == null) {
                status.resolve("offline");
            } else {
                status.resolve(data.stream.channel.status);
            }
        }
    );

    return status.promise;
}

function FccFollows(scope, http, sce, q) {
    var followsAPI =
    "https://wind-bow.glitch.me/twitch-api/users" +
    "/freecodecamp/follows/channels";

    followsAPI = sce.trustAsResourceUrl(followsAPI);

    http.jsonp(followsAPI).then(
        function(response) {
            var follows = response.data.follows;
            scope.channels = [];
            for (var i = 0; i < follows.length; i ++) {
                var channel = follows[i].channel,
                streamAPI =
                "https://api.twitch.tv/kraken/streams" + 
                "?client_id=ytdni97a2f5slkofm4reso3jxu2bed";

                if (channel.status == null) {
                    channel.status = "offline";
                } else {
                    CheckChannelStatus(
                        streamAPI, http, q
                    ).then(
                        function(status) {
                            channel.status = status;
                        }
                    );
                }

                scope.channels.push({
                    name: channel.name,
                    display_name: channel.display_name,
                    logo: channel.logo,
                    url: channel.url,
                    status: channel.status
                });
            }
            console.log(scope.channels);
        },
        failCallbacks
    );
}

function FindChannel(scope, http, sce, q) {
    var channelAPI = "https://wind-bow.glitch.me/twitch-api/channels/",
    streamAPI = "https://wind-bow.glitch.me/twitch-api/streams/",
    userAPI = "https://wind-bow.glitch.me/twitch-api/users/",
    input = angular.element(
        document.querySelector("input#channel")
    ),
    channel = input.val();

    userAPI = sce.trustAsResourceUrl((userAPI + channel));
    streamAPI = sce.trustAsResourceUrl((streamAPI + channel));

    http.jsonp(userAPI).then(
        function (response) {
            var data = response.data,
            channel = {};

            scope.channels = [];
            console.log(data);
            if (data.status && data.status != 200) {
                channel = {
                    name: data.status,
                    display_name: data.error,
                    logo: "",
                    status: data.message,
                    url: "#"
                }
            } else {
                channel = {
                    name: data.name,
                    display_name: data.display_name,
                    logo: data.logo,
                    url: data.url
                };

                CheckChannelStatus(
                    streamAPI, http, q
                ).then(
                    function(status) {
                        channel["status"] = status;
                    }
                );
            }

            scope.channels.push(channel);
        }
    );
}
