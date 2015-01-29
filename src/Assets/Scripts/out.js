var directives = angular.module('directives', []);
var testme;
(function (testme) {
    testme.html = '<div>Hey wassup yo! what</div>';
})(testme || (testme = {}));
var Controllers;
(function (Controllers) {
    var MainController = (function () {
        function MainController($scope, logService) {
            this.message = " Imrul Hasan asdf";
            $scope.vm = this;
            logService.log('Some log');
        }
        return MainController;
    })();
    Controllers.MainController = MainController;
})(Controllers || (Controllers = {}));
var Controllers;
(function (Controllers) {
    var TestController = (function () {
        function TestController($scope) {
            this.message = "foo";
            $scope.vm = this;
        }
        return TestController;
    })();
    Controllers.TestController = TestController;
})(Controllers || (Controllers = {}));
var Controllers;
(function (Controllers) {
    var HomeController = (function () {
        function HomeController($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$localStorage = $localStorage;
            this.init();
        }
        HomeController.prototype.init = function () {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
            }
            else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
                jQuery('#account-id').hide();
            }
        };
        HomeController.prototype.logout = function () {
            this.callLogoutService();
        };
        HomeController.prototype.callLogoutService = function () {
            var logoutUrl = "http://localhost:64237/api/Account/Logout";
            $.post(logoutUrl).done(function (response) {
                this.$localStorage.accessToken = null;
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
            }).fail(function (response) {
                alert('Error while logging out');
            });
        };
        return HomeController;
    })();
    Controllers.HomeController = HomeController;
})(Controllers || (Controllers = {}));
directives.directive('testme', function () {
    return {
        restrict: 'EAC',
        template: testme.html
    };
});
angular.module('codeWarriorApp.services', []).factory('loginService', function ($http) {
    var serviceApi = {
        register: function (email, password) {
            return $http({
                method: 'POST',
                url: 'http://localhost:64237/api/Account/Register',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
                },
                data: { UserName: email, Password: password, ConfirmPassword: password }
            });
        }
    };
    return serviceApi;
});
angular.module('codeWarriorApp.controllers', []).controller(Controllers);
angular.module('codeWarriorApp', ['codeWarriorApp.controllers', 'codeWarriorApp.services', 'ngRoute', 'ngStorage']).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/home', { templateUrl: 'App/Templates/home.html', controller: 'HomeController' }).when('/login', { templateUrl: 'App/Templates/login.html', controller: 'LoginController' }).when('/account', { templateUrl: 'App/Templates/account.html', controller: 'AccountController' }).otherwise({ redirectTo: '/home' });
}]);
var services = angular.module('codeWarriorApp.services', []);
var Controllers;
(function (Controllers) {
    var LoginController = (function () {
        function LoginController($scope, $rootScope, $localStorage, $location) {
            this.loginMessage = '';
            this.signupMessage = '';
            this.loginModel = { userName: 'tilok369', password: '' };
            this.signupModel = {
                userName: '',
                fullName: '',
                sex: '',
                addressLine1: '',
                addressLine2: '',
                mobile: '',
                email: '',
                password: '',
                confirmPassword: ''
            };
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.init();
        }
        LoginController.prototype.init = function () {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
            }
            else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
                jQuery('#account-id').hide();
            }
        };
        LoginController.prototype.login = function () {
            if (this.validateLogin()) {
                this.loginMessage = '';
                this.callLoginService(this.loginModel.userName, this.loginModel.password, this.loginModel.password);
            }
        };
        LoginController.prototype.signup = function () {
            if (this.validateSingup()) {
                this.signupMessage = '';
                this.callRegisterService();
            }
        };
        LoginController.prototype.callLoginService = function (userName, password, confirmPassowrd) {
            var pub = this;
            var loginUrl = "http://localhost:64237/Token";
            var data = 'userName=' + userName + '&password=' + password + '&confirmPassword=' + confirmPassowrd + '&grant_type=password';
            $.post(loginUrl, data).done(function (response) {
                pub.$localStorage.accessToken = response.access_token;
                pub.$localStorage.userName = userName;
                pub.showLoginMenu();
                pub.$scope.$apply(function () {
                    pub.$location.path('/home');
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    pub.loginMessage = 'invalid user name or password';
                });
            });
        };
        LoginController.prototype.callRegisterService = function () {
            var pub = this;
            this.signupMessage = 'Registering..';
            var registerUrl = "http://localhost:64237/api/account/register";
            var data = 'userName=' + this.signupModel.userName + '&password=' + this.signupModel.password + '&confirmPassword=' + this.signupModel.confirmPassword + '&fullName=' + this.signupModel.fullName + '&sex=' + this.signupModel.sex + "&address=" + this.signupModel.addressLine1 + '|' + this.signupModel.addressLine2 + '&phoneNumber=' + this.signupModel.mobile + '&emailAddress=' + this.signupModel.email;
            $.post(registerUrl, data).done(function (response) {
                pub.$scope.$apply(function () {
                    pub.clearRegisterModel();
                    pub.signupMessage = 'Please login to your email address for registration cofirmation';
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    pub.signupMessage = 'Invalid request, please check all the fields again';
                });
            });
        };
        LoginController.prototype.validateLogin = function () {
            if (!this.loginModel.userName) {
                this.loginMessage = 'User name field is empty';
                return false;
            }
            if (!this.loginModel.password) {
                this.loginMessage = 'password field is empty';
                return false;
            }
            return true;
        };
        LoginController.prototype.validateSingup = function () {
            if (!this.signupModel.userName) {
                this.signupMessage = 'name field is empty';
                return false;
            }
            if (!this.signupModel.fullName) {
                this.signupMessage = 'name field is empty';
                return false;
            }
            if (!this.signupModel.sex || this.signupModel.sex == 'Sex') {
                this.signupMessage = 'please select sex';
                return false;
            }
            if (!this.signupModel.addressLine1) {
                this.signupMessage = 'address field is empty';
                return false;
            }
            if (!this.signupModel.mobile) {
                this.signupMessage = 'mobile number field is empty';
                return false;
            }
            if (!this.signupModel.email) {
                this.signupMessage = 'email field is empty';
                return false;
            }
            if (!this.signupModel.password) {
                this.signupMessage = 'password field is empty';
                return false;
            }
            if (this.signupModel.password.length < 6) {
                this.signupMessage = 'passowrd must be atleast 6 character/digit long';
                return false;
            }
            if (this.signupModel.password != this.signupModel.confirmPassword) {
                this.signupMessage = 'passowrd not matched';
                return false;
            }
            return true;
        };
        LoginController.prototype.clearRegisterModel = function () {
            this.signupModel.userName = '';
            this.signupModel.password = '';
            this.signupModel.confirmPassword = '';
            this.signupModel.fullName = '';
            this.signupModel.sex = '';
            this.signupModel.addressLine1 = '';
            this.signupModel.addressLine2 = '';
            this.signupModel.mobile = '';
            this.signupModel.email = '';
        };
        LoginController.prototype.showLoginMenu = function () {
            jQuery('#login-id').hide();
            jQuery('#logout-id').show();
            jQuery('#user-id').show();
            jQuery('#account-id').show();
            jQuery('#account-id a').attr('href', '#/account/' + this.$localStorage.userName);
            jQuery('#user-id a').text(this.$localStorage.userName);
        };
        return LoginController;
    })();
    Controllers.LoginController = LoginController;
})(Controllers || (Controllers = {}));
var Controllers;
(function (Controllers) {
    var LogoutController = (function () {
        function LogoutController($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$localStorage = $localStorage;
        }
        LogoutController.prototype.logout = function () {
            this.callLogoutService();
        };
        LogoutController.prototype.callLogoutService = function () {
            this.$localStorage.accessToken = null;
            this.$localStorage.userName = null;
            jQuery('#login-id').show();
            jQuery('#logout-id').hide();
            jQuery('#account-id').hide();
            jQuery('#user-id').hide();
        };
        return LogoutController;
    })();
    Controllers.LogoutController = LogoutController;
})(Controllers || (Controllers = {}));
var LogService = (function () {
    function LogService() {
    }
    LogService.prototype.log = function (msg) {
        console.log(msg);
    };
    return LogService;
})();
services.service('logService', LogService);
//# sourceMappingURL=out.js.map