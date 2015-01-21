angular.module('codeWarriorApp.controllers', [])
    .controller('homeController', function ($scope, $rootScope) {
        $scope.title = 'Code Warrior 2015 : E-Shop home';
        $rootScope.loginStatus = 'logout';
        $rootScope.loginClass = 'login';
        $rootScope.logoutClass = 'logout';
    });