FoorumApp.controller('ShowMessageController', function ($scope, $routeParams, Api) {
  Api.getMessage($routeParams.id).success(function (message) {
    $scope.message = message;
  });

  $scope.addReply = function () {
    Api.addReply({
      content: $scope.newReply.content,
    }, $routeParams.id).success(function (reply) {
      $scope.newReply.content = "";
      $scope.message.Replies.push(reply);
    });
  };
});
