/// <reference path="reference.ts" />

angular.module('codeWarriorApp', ['codeWarriorApp.controllers', 'codeWarriorApp.services', 'ngRoute', 'ngStorage'])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
            when('/home', { templateUrl: 'App/Templates/home.html', controller: 'HomeController' }).
            when('/login', { templateUrl: 'App/Templates/login.html', controller: 'LoginController' }).
            when('/account', { templateUrl: 'App/Templates/account.html', controller: 'AccountController' }).
            otherwise({ redirectTo: '/home' });
        //$locationProvider.html5Mode(true);
    }]);
