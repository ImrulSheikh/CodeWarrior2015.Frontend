angular.module('codeWarriorApp.servics', [])
    .factory('loginServices', function ($http) {
        var serviceApi = {};
        serviceApi.register = function (email, password) {
            return $http({
                method: 'POST',
                url: 'http://localhost:64237/api/Account/Register',
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, application/json'
                },
                crossDomain: true,
                data: {UserName : email, Password : password, ConfirmPassword : password}
                //data: 'userName=asad22&password=password123&confirmPassword=password123'
            });
        };
        return serviceApi;
    });