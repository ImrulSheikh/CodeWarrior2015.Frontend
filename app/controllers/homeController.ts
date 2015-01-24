module Controllers{
	export class HomeController{
		constructor($scope, $rootScope){
			$scope.vm = this;
		}

		function init(){
			if (localStorage.accessToken && localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
            } else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
            }
		}

		function logout () {
            this.callLogoutService();
        }
        
        function callLogoutService() {
            var logoutUrl = "http://localhost:64237/api/Account/Logout";
            $.post(logoutUrl).success(function (response) {
                localStorage.accessToken = null;
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
            }).error(function (response) {
                alert('Error while logging out');
            });
        };
	}
}