angular.module('codeWarriorApp.controllers', [])
    .controller('loginController', function ($scope, $location, loginService) {
        $scope.loginMessage = '';
        $scope.signupMessage = '';
        $scope.loginModel = {};
        $scope.signupModel = {};

        $scope.login = function () {
            if ($scope.validateLogin()) {
                $scope.loginMessage = '';
                if ($scope.loginModel.email == 'imscodewarrior@imshealth.com' && $scope.loginModel.password == 'ims') {
                    $location.url('/home');
                } else {
                    $scope.loginMessage = 'invalid user name or password';
                }
            }
        };

        $scope.signup = function () {
            console.log('entered1');
            if ($scope.validateSingup()) {
                console.log('entered2');
                $scope.signupMessage = '';
                loginServices.register($scope.signupModel.email, $scope.signupModel.password).success(function (response) {
                    console.log(response);
                });
            }
        };

        $scope.validateLogin = function () {
            if (!$scope.loginModel.email) {
                $scope.loginMessage = 'email field is empty';
                return false;
            }
            if (!$scope.loginModel.password) {
                $scope.loginMessage = 'password field is empty';
                return false;
            }
            return true;
        };

        $scope.validateSingup = function () {
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
            return true;
        };

    });