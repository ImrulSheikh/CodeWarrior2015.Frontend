/// <reference path="../reference.ts" />

module Controllers {
    export class BuyerProfileController {
        private accountService = new AccountService();
        private categoryServicve = new CategoryService();
        private $scope;
        private $localStorage;
        private $location;
        private buyerInfoMessage = '';
        private categoryInfoMessage = '';
        private buyInfoList: Array<Object>;
        private categories: Array<Object>;

        constructor($scope, $rootScope, $localStorage, $location) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.init();
        }

        public init() {
            jQuery('#home-id').removeClass('active');
            this.checkLoginStatus();
            this.GetCategories();
            this.GetBuyerProfile();
        }

        public GotoCategoryPage(id) {
            this.$localStorage.catId = id;
            this.$location.path('/home');
        }

        private GetBuyerProfile()
        {
            var pub = this;
            console.log(this.$localStorage.userName);
            this.accountService.getBuyerProfile(this.$localStorage.userName).done(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    console.log(response);
                    if (response.length == 0) {
                        pub.buyerInfoMessage = 'No buying product found';
                    }
                    else
                    {
                        pub.buyInfoList = new Array<Object>();
                        for (var i = 0; i < response.length; i++) {
                            pub.buyInfoList.push(response[i]);
                        }
                    }
                });
            }).fail(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.buyerInfoMessage = 'Error while getting buying information';
                });
            });
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