angular.module('codeWarriorApp.controllers', [])
    .controller('homeController', function ($scope, $rootScope) {
        (function () {
            if (localStorage.accessToken && localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
            } else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
            }
        })();

        $scope.logout = function () {
            $scope.callLogoutService();
        };
        
        $scope.callLogoutService = function () {
            var logoutUrl = "http://localhost:64237/api/Account/Logout";
            $.post(logoutUrl).success(function (response) {
                localStorage.accessToken = null;
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
            }).error(function (response) {
                alert('Error while logging out');
            });
        };
    })
    .controller('loginController', function ($scope, $rootScope, $location, loginServices) {
        (function () {
            if (localStorage.accessToken && localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
            } else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
            }
        })();

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
                $scope.callRegisterService();
            }
            
        };

        $scope.callRegisterService = function () {
            var registerUrl = "http://localhost:64237/api/account/register";
            var data = 'userName=' + $scope.signupModel.userName + '&password=' + $scope.signupModel.password + 
                '&confirmPassword=' + $scope.signupModel.confirmPassword +
                '&fullName=' + $scope.signupModel.fullName + '&sex=' + $scope.signupModel.sex +
                "&address=" + $scope.signupModel.addressLine1 + '|' + $scope.signupModel.addressLine2 +
                '&phoneNumber=' + $scope.signupModel.mobile + '&emailAddress=' + $scope.signupModel.email;
            $.post(registerUrl, data).success(function (response) {
                $scope.$apply(function () {
                    $scope.signupModel.userName = '';
                    $scope.signupModel.password = '';
                    $scope.signupModel.confirmPassword = '';
                    $scope.signupModel.fullName = '';
                    $scope.signupModel.sex = '';
                    $scope.signupModel.addressLine1 = '';
                    $scope.signupModel.addressLine2 = '';
                    $scope.signupModel.mobile = '';
                    $scope.signupModel.email = '';
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
                localStorage.accessToken = response.access_token;
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id a').text(userName)
                jQuery('#account-id').attr('href', '#/account/' + userName);
                $scope.$apply(function () {
                    $location.url('/home');
                });
            }).error(function (response) {
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
            //console.log($scope.signupModel.password);
           // console.log($scope.signupModel.confirmPassword);
            if (!$scope.signupModel.userName) {
                $scope.signupMessage = 'name field is empty';
                return false;
            }
            if (!$scope.signupModel.fullName) {
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
            if ($scope.signupModel.password.length < 6) {
                $scope.signupMessage = 'passowrd must be atleast 6 character/digit long';
                return false;
            }
            if ($scope.signupModel.password != $scope.signupModel.confirmPassword) {
                $scope.signupMessage = 'passowrd not matched';
                return false;
            }
            return true;
        };

    })
    .controller('accountController', function ($scope, $rootScope, $routeParams) {
        $scope.accountModel = {};
        (function () {
            //console.log($routeParams.id);
            $scope.accountModel.userName = $routeParams.id;
        })();
        
        $scope.callGetProfileService = function () {
            var profileUrl = "http://localhost:64237/api/Account/Logout";
            $.post(profileUrl).success(function (response) {
            }).error(function (response) {
                alert('Error while getting profile info');
            });
        };
    });