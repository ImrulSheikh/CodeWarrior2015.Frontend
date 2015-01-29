/// <reference path="../reference.ts" />

module Controllers {
    export class LogoutController {
        private $localStorage;
        constructor($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$localStorage = $localStorage;
        }

        public logout() {
            this.callLogoutService();
        }

        public callLogoutService() {
            this.$localStorage.accessToken = null;
            this.$localStorage.userName = null;
            jQuery('#login-id').show();
            jQuery('#logout-id').hide();
            jQuery('#account-id').hide();
            jQuery('#user-id').hide();
        }
    }
} 