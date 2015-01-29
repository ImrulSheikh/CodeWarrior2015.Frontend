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
	}
}