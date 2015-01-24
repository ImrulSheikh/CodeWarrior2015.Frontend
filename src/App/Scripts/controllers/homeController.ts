/// <reference path="../reference.ts" />

module Controllers{
	export class HomeController{
		constructor($scope, $rootScope){
			$scope.vm = this;
		}

		public init(){
//			if (localStorage.accessToken && localStorage.accessToken != 'null') {
//                jQuery('#login-id').hide();
//                jQuery('#logout-id').show();
//                jQuery('#user-id').show();
//            } else {
//                jQuery('#login-id').show();
//                jQuery('#logout-id').hide();
//                jQuery('#user-id').hide();
//            }
		}

		public  logout () {
            this.callLogoutService();
        }
        
        public  callLogoutService() {
            var logoutUrl = "http://localhost:64237/api/Account/Logout";
//            $.post(logoutUrl).success(function (response) {
//                localStorage.accessToken = null;
//                jQuery('#login-id').show();
//                jQuery('#logout-id').hide();
//            }).error(response=> {
//                alert('Error while logging out');
//            });
        }
	}
}