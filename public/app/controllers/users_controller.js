FoorumApp.controller('UsersController', function ($scope, $location, Api) {
  if ($scope.userLoggedIn) {
    $location.path('/');
  }

  $scope.login = function () {
    $scope.errorMessage = '';

    Api.login($scope.user)
      .success(function () {
        $location.path('/');
      })
      .error(function () {
        $scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
      });
  };

  $scope.register = function () {
    $scope.errorMessage = '';

    Api.register($scope.user)
      .success(function () {
        $location.path('/');
      })
      .error(function (response) {
        $scope.errorMessage = response.error;
      });
  };
});
