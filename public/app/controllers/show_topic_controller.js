FoorumApp.controller('ShowTopicController', function ($scope, $routeParams, $location, Api) {
  Api.getTopic($routeParams.id).success(function (topic) {
    $scope.topic = topic;
  });

  $scope.addMessage = function () {
    Api.addMessage({
      title: $scope.newMessage.title,
      content: $scope.newMessage.content
    }, $routeParams.id).success(function (message) {
      $scope.newMessage.title = "";
      $scope.newMessage.content = "";
      $scope.topic.Messages.push(message);
    });
  };
});
