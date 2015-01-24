angular.module('codeWarriorApp.controllers', [])
    .controller('homeController', function ($scope, $rootScope) {
        (function () {
            helper.checkLoginStatus();
        })();
    })
    .controller('loginController', function ($scope, $rootScope, $location, loginServices) {
        (function () {
            helper.checkLoginStatus();
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
            $scope.signupMessage = 'Registering..';
            var registerUrl = "http://localhost:64237/api/account/register";
            var data = 'userName=' + $scope.signupModel.userName + '&password=' + $scope.signupModel.password + 
                '&confirmPassword=' + $scope.signupModel.confirmPassword +
                '&fullName=' + $scope.signupModel.fullName + '&sex=' + $scope.signupModel.sex +
                "&address=" + $scope.signupModel.addressLine1 + '|' + $scope.signupModel.addressLine2 +
                '&phoneNumber=' + $scope.signupModel.mobile + '&emailAddress=' + $scope.signupModel.email;
            $.post(registerUrl, data).success(function (response) {
                $scope.$apply(function () {
                    $scope.clearRegisterModel();
                    $scope.signupMessage = 'Please login to your email address for registration cofirmation';
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
                localStorage.userName = userName;
                helper.showLoginMenu();
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

        $scope.clearRegisterModel = function(){
            $scope.signupModel.userName = '';
            $scope.signupModel.password = '';
            $scope.signupModel.confirmPassword = '';
            $scope.signupModel.fullName = '';
            $scope.signupModel.sex = '';
            $scope.signupModel.addressLine1 = '';
            $scope.signupModel.addressLine2 = '';
            $scope.signupModel.mobile = '';
            $scope.signupModel.email = '';
        };

    })
    .controller('accountController', function ($scope, $rootScope, $routeParams, $location) {
        $scope.accountModel = {};
        $scope.profileEditMessage = '';
        $scope.callGetProfileService = function () {
            /*var profileUrl = "http://localhost:64237/api/Account/Logout";
            $.post(profileUrl).success(function (response) {
            }).error(function (response) {
                alert('Error while getting profile info');
            });*/
            $scope.accountModel.userName = $routeParams.id;
            $scope.accountModel.fullName = 'Code Warrior';
            $scope.accountModel.sex = 'Male';
            $scope.accountModel.addressLine1 = 'addressLine1';
            $scope.accountModel.addressLine2 = 'addressLine2';
            $scope.accountModel.mobile = '34059834';
            $scope.accountModel.email = 'tbh.tilok@live.com';
            $scope.accountModel.password = 'cwcUser';
        };
        (function () {
            helper.checkLoginStatus();
            if (localStorage.accessToken && localStorage.accessToken != 'null'){
                $scope.callGetProfileService();
            }else{
                $location.url('/home');
            };
            
        })();

        $scope.saveProfile = function(){
            if($scope.validateProfileEdit()){
                $scope.profileEditMessage = 'Profile edited successfully';
            }            
        };

        $scope.validateProfileEdit = function () {
            if (!$scope.accountModel.fullName) {
                $scope.profileEditMessage = 'name field is empty';
                return false;
            }
            if (!$scope.accountModel.sex || $scope.accountModel.sex == 'Sex') {
                $scope.profileEditMessage = 'please select sex';
                return false;
            }
            if (!$scope.accountModel.addressLine1) {
                $scope.profileEditMessage = 'address field is empty';
                return false;
            }
            if (!$scope.accountModel.mobile) {
                $scope.profileEditMessage = 'mobile number field is empty';
                return false;
            }
            if (!$scope.accountModel.email) {
                $scope.profileEditMessage = 'email field is empty';
                return false;
            }
            if (!$scope.accountModel.password) {
                $scope.profileEditMessage = 'password field is empty';
                return false;
            }
            if ($scope.accountModel.password.length < 6) {
                $scope.profileEditMessage = 'passowrd must be atleast 6 character/digit long';
                return false;
            }
            return true;
        };
        
    });