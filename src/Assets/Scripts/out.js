var services = angular.module('codeWarriorApp.servics', []);
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
        function HomeController($scope, $rootScope) {
            $scope.vm = this;
        }
        HomeController.prototype.init = function () {
        };
        HomeController.prototype.logout = function () {
            this.callLogoutService();
        };
        HomeController.prototype.callLogoutService = function () {
            var logoutUrl = "http://localhost:64237/api/Account/Logout";
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
var LogService = (function () {
    function LogService() {
    }
    LogService.prototype.log = function (msg) {
        console.log(msg);
    };
    return LogService;
})();
services.service('logService', LogService);
angular.module('codeWarriorApp.servics', []).factory('loginService', function ($http) {
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
angular.module('codeWarriorApp', ['codeWarriorApp.controllers', 'codeWarriorApp.servics', 'ngRoute']).config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.when('/home', { templateUrl: 'Templates/home.html', controller: 'homeController' }).when('/login', { templateUrl: 'Templates/login.html', controller: 'loginController' }).when('/account', { templateUrl: 'Templates/account.html', controller: 'accountController' }).otherwise({ redirectTo: '/home' });
    $locationProvider.html5Mode(true);
}]);
angular.module('codeWarriorApp.controllers', []).controller(Controllers);
//# sourceMappingURL=out.js.map