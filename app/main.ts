/// <reference path="./reference.ts" />

//angular.module('myApp',['controllers','services','directives']);

angular.module('codeWarriorApp', ['codeWarriorApp.controllers', 'codeWarriorApp.servics', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
            when('/home', { templateUrl: 'Templates/home.html', controller: 'homeController' }).
            when('/login', { templateUrl: 'Templates/login.html', controller: 'loginController' }).
            when('/account', { templateUrl: 'Templates/account.html', controller: 'accountController' }).
            otherwise({ redirectTo: '/home' });
        $locationProvider.html5Mode(true);
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }]);
