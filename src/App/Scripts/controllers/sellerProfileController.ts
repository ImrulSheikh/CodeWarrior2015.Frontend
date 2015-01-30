/// <reference path="../reference.ts" />

module Controllers {
    export class SellerProfileController {
        private $scope;
        private $localStorage;
        private $location;
        private sellerInfoList: Array<Object>;

        constructor($scope, $rootScope, $localStorage, $location) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.init();
        }

        public init() {
            this.checkLoginStatus();
            this.sellerInfoList = new Array<Object>();
            this.sellerInfoList[0] = { Name: 'Product 1', Price: 100, Quantity: 1 };
            this.sellerInfoList[1] = { Name: 'Product 2', Price: 200, Quantity: 2 };
        }

        private checkLoginStatus() {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#user-id a').text(this.$localStorage.userName);
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
                jQuery('#add-product-id').show();
            } else {
                this.$location.path('/home');
                jQuery('#add-product-id').hide();
            }
        }
    }
} 