function TwitchStream($scope, $http, $q) {
    $scope.findChannel = function() {
        FindChannel($scope, $http, $q);
    }
    $scope.fccFollows = function() {
        FccFollows($scope, $http, $q);
    }

    $scope.fccFollows();
}

function failCallbacks(response) {
    console.log(response.data.msg);
}

function CheckChannelStatus(channelName, http, q) {
    var status = q.defer(),
    streamAPI = "https://wind-bow.glitch.me/twitch-api/streams/";

    http.get((streamAPI + channelName)).then(
        function (response) {
            data = response.data;

            if (data.stream == null) {
                status.resolve("offline");
            } else {
                status.resolve(data.stream.channel.status);
            }
        },
        failCallbacks
    );

    return status.promise;
}

function FccFollows(scope, http, q) {
    var followsAPI =
    "https://wind-bow.glitch.me/twitch-api/users" +
    "/freecodecamp/follows/channels";

    http.get(followsAPI).then(
        function(response) {
            var follows = response.data.follows;
            scope.channels = [];

            for (var i = 0; i < follows.length; i++) {
                var channelInfo = follows[i].channel;

                if (follows[i].channel.status == null) {
                    channelInfo.status = "offline";
                } else {
                    CheckChannelStatus(
                        channelInfo.name, http, q
                    ).then(
                        function(status) {
                            channelInfo["status"] = status;
                        }
                    );
                }

                console.log(channelInfo.status);
                scope.channels.push(channelInfo);
            }
            console.log(scope.channels);
        },
        failCallbacks
    );
}

function FindChannel(scope, http, q) {
    var channelAPI = "https://wind-bow.glitch.me/twitch-api/channels/",
    userAPI = "https://wind-bow.glitch.me/twitch-api/users/",
    input = angular.element(
        document.querySelector("input#channel")
    ),
    channel = input.val();

    http.get(
        (userAPI + channel)
    ).then(
        function (response) {
            var data = response.data,
            channelInfo = {};

            scope.channels = [];
            console.log(data);
            if (data.status && data.status != 200) {
                channelInfo = {
                    name: data.status,
                    display_name: data.error,
                    logo: "",
                    status: data.message,
                    url: "#"
                }
            } else {
                channelInfo = {
                    name: data.name,
                    display_name: data.display_name,
                    logo: data.logo,
                    url: data.url
                };

                CheckChannelStatus(
                    channelInfo.name, http, q
                ).then(
                    function(status) {
                        channelInfo["status"] = status;
                    }
                );
            }

            scope.channels.push(channelInfo);
        }
    );
}
