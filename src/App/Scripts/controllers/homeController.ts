/// <reference path="../reference.ts" />

module Controllers{
    export class HomeController{
        private $localStorage;
        constructor($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$localStorage = $localStorage;
            this.init();
		}

		public init(){
			if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
            } else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
                jQuery('#account-id').hide();
            }
		}

		public  logout () {
            this.callLogoutService();
        }
        
        public  callLogoutService() {
            var logoutUrl = "http://localhost:64237/api/Account/Logout";
            $.post(logoutUrl).done(function (response) {
                this.$localStorage.accessToken = null;
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
            }).fail( function(response) {
                alert('Error while logging out');
            });
        }
	}
}