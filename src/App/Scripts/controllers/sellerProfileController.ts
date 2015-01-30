/// <reference path="../reference.ts" />

module Controllers {
    export class SellerProfileController {
        private accountService = new AccountService();
        private sellerInfoMessage = '';
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
            this.GetSellerProfile();
        }

        private GetSellerProfile() {
            var pub = this;
            this.accountService.getSellerProfile(this.$localStorage.userName).done(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    if (response.length == 0) {
                        pub.sellerInfoMessage = 'No buying product found';
                    }
                    else {
                        pub.sellerInfoList = new Array<Object>();
                        for (var i = 0; i < response.length; i++) {
                            pub.sellerInfoList.push(response[i]);
                        }
                    }
                });
            }).fail(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.sellerInfoMessage = 'Error while getting buying information';
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