/// <reference path="../reference.ts" />

module Controllers {
    export class LogoutController {
        private $localStorage;
        private $location;
        constructor($scope, $rootScope, $localStorage, $location) {
            $scope.vm = this;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.init();
        }

        private init()
        {
            this.checkLoginStatus();
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
            jQuery('#wishlist-id').hide();
        }

        private checkLoginStatus() {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#user-id a').text(this.$localStorage.userName);
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
                jQuery('#add-product-id').show();
                jQuery('#wishlist-id').show();


            } else {
                this.$location.path('/home');
                jQuery('#add-product-id').hide();
            }
        }
    }
} 