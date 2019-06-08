let app = angular.module('myApp', ['ngCookies']);
app.controller('myCtrl', function ($scope, $http) {
  $scope.cellphone = '';
  $scope.password = '';
  $scope.userRole = '3';
  $scope.alertMessage = '';

  $scope.initProcess = function(){
    let cookieValue = common.getCookie('loginUser');
    if(cookieValue === undefined || cookieValue === null || cookieValue === ''){
      return false;
    }
    let financialInfo = JSON.parse(cookieValue);
    switch (financialInfo.userRole) {
      case '2': //理财经理
        location.href = '/financial/index';
        break;
      case '3': //大堂经理
        location.href = '/lobby/index';
        break;
      case '4': //运营主管
        location.href = '/financial/index';
        break;
    }
  };

  $scope.login = function () {
    if(this.cellphone === '' || this.password === ''){
      return false;
    }
    $http.post('/', {
      cellphone:  this.cellphone,
      password: this.password
    }).then(function successCallback(response) {
      if(response.data.err){
        $scope.alertMessage = response.data.msg;
        $('#dialog-message').modal('show');
        return false;
      }
      if(response.data.userInfo === null){
        $scope.alertMessage = '该账户不存在。';
        $('#dialog-message').modal('show');
        return false;
      }

      if(response.data.userInfo.userRole !== $scope.userRole){
        switch ($scope.userRole) {
          case '2': //理财经理
            $scope.alertMessage = '请使用理财经理账户登陆。';
            $('#dialog-message').modal('show');
            return false;
          case '3': //大堂经理
            $scope.alertMessage = '请使用大堂经理账户登陆。';
            $('#dialog-message').modal('show');
            return false;
          case '4': //运营主管
            $scope.alertMessage = '请使用运营主管账户登陆。';
            $('#dialog-message').modal('show');
            return false;
          default:
            return false;
        }
      }

      common.setCookie('loginUser', JSON.stringify(response.data.userInfo));

      switch ($scope.userRole) {
        case '2': //理财经理
          location.href = '/financial/index';
          break;
        case '3': //大堂经理
          $http.post('/financial/index', {
            userID:  response.data.userInfo.userID,
            clockStatus: '0',
            loginUser: response.data.userInfo.userID
          }).then(function successCallback(response) {
            if(response.data.err){
              $scope.alertMessage = '系统异常，请稍后再试。';
              $('#dialog-message').modal('show');
              return false;
            }
            location.href = '/lobby/index';
          }, function errorCallback(response) {
            $scope.alertMessage = '网络异常，请稍后再试。';
            $('#dialog-message').modal('show');
          });
          break;
        case '4': //运营主管
          location.href = '/financial/index';
          break;
      }
    }, function errorCallback(response) {
      $scope.alertMessage = '网络异常，请稍后再试。';
      $('#dialog-message').modal('show');
    });
  };

  $scope.initProcess();
});