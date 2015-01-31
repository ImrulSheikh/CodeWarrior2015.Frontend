/// <reference path="../reference.ts" />

module Controllers {
    export class SellerProfileController {
        private accountService = new AccountService();
        private sellerInfoMessage = '';
        private $scope;
        private $localStorage;
        private $location;
        private productId;
        private sellerInfoList: Array<Object>;

        constructor($scope, $rootScope, $routeParams, $localStorage, $location) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.productId = $routeParams.Id;
            console.log(this.productId);
            this.init();
        }

        public init() {
            jQuery('#home-id').removeClass('active');
            this.checkLoginStatus();
            this.GetSellerProfile();
        }

        private GetSellerProfile() {
            var pub = this;
            this.accountService.getSellerProfile(this.$localStorage.userName).done(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.sellerInfoList = response;
                });
            }).fail(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.sellerInfoMessage = 'Error while getting seller information';
                });
            });
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