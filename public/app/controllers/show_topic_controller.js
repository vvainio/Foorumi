FoorumApp.controller('ShowTopicController', function ($scope, $routeParams, $location, Api) {
  $scope.newMessage = {};

  Api.getTopic($routeParams.id).success(function (topic) {
    $scope.topic = topic;
  });

  $scope.addMessage = function () {
    Api.addMessage({
      title: $scope.newMessage.title,
      content: $scope.newMessage.content
    }, $routeParams.id).success(function (message) {
      $scope.newMessage = {};
      message.User = $scope.userLoggedIn;
      $scope.topic.Messages.push(message);
    });
  };
});
