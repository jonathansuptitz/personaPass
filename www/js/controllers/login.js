app.controller('LoginCtrl', function ($scope, $state, $ionicHistory){
  $scope.usuario = {};

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  $scope.login = function () {
    if ($scope.usuario.password === '12345') {
       $state.go('lista');
    } else {
      alert('Senha Incorreta!');
    }
  };
});
