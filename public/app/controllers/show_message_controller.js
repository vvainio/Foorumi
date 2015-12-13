FoorumApp.controller('ShowMessageController', function ($scope, $routeParams, Api) {
  $scope.newReply = {};

  Api.getMessage($routeParams.id).success(function (message) {
    $scope.message = message;
  });

  $scope.addReply = function () {
    Api.addReply({
      content: $scope.newReply.content,
    }, $routeParams.id).success(function (reply) {
      $scope.newReply = {};
      reply.User = $scope.userLoggedIn;
      $scope.message.Replies.push(reply);
    });
  };
});
