/// <reference path="../reference.ts" />

module Controllers {
    export class ProductDetailsController {
        private categoryServicve = new CategoryService();
        private $scope;
        private $localStorage;
        private $location;
        private buyerInfoMessage = '';
        private categoryInfoMessage = '';
        private productId;
        private buyInfoList: Array<Object>;
        private categories: Array<Object>;

        constructor($scope, $rootScope, $localStorage, $location, $rootParams) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.productId = $rootParams.id;
            this.init();
        }

        public init() {
            this.checkLoginStatus();
            this.GetCategories();
        }

        private GetCategories() {
            var pub = this;
            this.categoryServicve.getCategories().done(function (response) {

                pub.categories = new Array<Object>();
                for (var i = 0; i < response.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.categories.push(response[i]);
                    });

                }
            })
                .fail(function (response) {
                pub.buyerInfoMessage = 'Error while getting category information';
                console.log('Error: ' + response);
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