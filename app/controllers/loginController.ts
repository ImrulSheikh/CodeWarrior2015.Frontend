angular.module('codeWarriorApp.controllers', [])
    .controller('loginController', function ($scope, $rootScope, $location, loginServices) {
        $scope.loginMessage = '';
        $scope.signupMessage = '';
        $scope.loginModel = {};
        $scope.signupModel = {};

        $scope.login = function () {
            if ($scope.validateLogin()) {
                $scope.loginMessage = '';
                $scope.callLoginService($scope.loginModel.userName, $scope.loginModel.password, $scope.loginModel.password);
            }
        };

        $scope.signup = function () {
            if ($scope.validateSingup()) {
                $scope.signupMessage = '';
                $scope.callRegisterService($scope.signupModel.name, $scope.signupModel.password, $scope.signupModel.confirmPassword);
            }
            
        };

        $scope.callRegisterService = function (userName, password, confirmPassowrd) {
            var registerUrl = "http://localhost:64237/api/account/register";
            var data = 'userName=' + userName + '&password=' + password + '&confirmPassword=' + confirmPassowrd;
            $.post(registerUrl, data).success(function (response) {
                $scope.$apply(function () {
                    $scope.signupMessage = 'Successfully registered, please login';
                });
            }).error(function (response) {
                $scope.$apply(function () {
                    $scope.signupMessage = 'Invalid request, please check all the fields again';
                });
            });
        };
        
        $scope.callLoginService = function (userName, password, confirmPassowrd) {
            var loginUrl = "http://localhost:64237/Token";
            var data = 'userName=' + userName + '&password=' + password + '&confirmPassword=' + confirmPassowrd + '&grant_type=password';
            $.post(loginUrl, data).success(function (response) {
                console.log(response.access_token);
                localStorage.accessToken = response.access_token;
                $scope.$apply(function () {
                    $rootScope.loginStatus = 'login';
                    $rootScope.loginClass = 'logout';
                    $rootScope.logoutClass = 'login';
                    $location.url('http://localhost:8000');
                });
            }).error(function (response) {
                console.log(response);
                $scope.$apply(function () {
                    $scope.loginMessage = 'invalid user name or password';
                });
            });
        };

        $scope.validateLogin = function () {
            if (!$scope.loginModel.userName) {
                $scope.loginMessage = 'User name field is empty';
                return false;
            }
            if (!$scope.loginModel.password) {
                $scope.loginMessage = 'password field is empty';
                return false;
            }
            return true;
        };

        $scope.validateSingup = function () {
            console.log($scope.signupModel.password);
            console.log($scope.signupModel.confirmPassword);
            if (!$scope.signupModel.name) {
                $scope.signupMessage = 'name field is empty';
                return false;
            }
            if (!$scope.signupModel.sex || $scope.signupModel.sex == 'Sex') {
                $scope.signupMessage = 'please select sex';
                return false;
            }
            if (!$scope.signupModel.addressLine1) {
                $scope.signupMessage = 'address field is empty';
                return false;
            }
            if (!$scope.signupModel.mobile) {
                $scope.signupMessage = 'mobile number field is empty';
                return false;
            }
            if (!$scope.signupModel.email) {
                $scope.signupMessage = 'email field is empty';
                return false;
            }
            if (!$scope.signupModel.password) {
                $scope.signupMessage = 'password field is empty';
                return false;
            }
            if ($scope.signupModel.password != $scope.signupModel.confirmPassword) {
                $scope.signupMessage = 'passowrd not matched';
                return false;
            }
            return true;
        };

    });