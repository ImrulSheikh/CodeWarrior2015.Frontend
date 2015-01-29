/// <reference path="../reference.ts" />

angular.module('codeWarriorApp.services', [])
    .factory('loginService', function ($http) {
    var serviceApi = {
        register:
        (email, password) => {
            return $http({
                method: 'POST',
                url: 'http://localhost:64237/api/Account/Register',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
                },
                //crossDomain: true,
                data: { UserName: email, Password: password, ConfirmPassword: password }
            });
        }
    };
    return serviceApi;
});