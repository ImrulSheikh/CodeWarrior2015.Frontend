/// <reference path="../reference.ts" />

module Controllers {
    export class ProductDetailsController {
        private categoryServicve = new CategoryService();
        private prooductService = new ProductService();
        private $scope;
        private $localStorage;
        private $location;
        private buyerInfoMessage = '';
        private categoryInfoMessage = '';
        private productId;
        private product: Object;
        private buyInfoList: Array<Object>;
        private categories: Array<Object>;
        private comments: Array<Object>;
        private commentsCount;

        constructor($scope, $rootScope, $localStorage, $location, $routeParams) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.productId = $routeParams.id;
            this.init();
        }

        public init() {
            jQuery('#home-id').removeClass('active');
            console.log(this.productId);
            this.checkLoginStatus();
            this.GetCategories();
            this.GetProductDetails();
            this.GetComments();
        }

        public GotoCategoryPage(id)
        {
            this.$localStorage.catId = id;
            this.$location.path('/home');
        }

        private GetCategories() {
            var pub = this;
            this.categoryServicve.getCategories().done(function (response) {
                console.log(response);
                pub.categories = new Array<Object>();
                for (var i = 0; i < response.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.categories.push(response[i]);
                    });
                }
            }).fail(function (response) {
                pub.buyerInfoMessage = 'Error while getting category information';
                console.log('Error: ' + response);
            });
        }

        private GetComments() {
            var pub = this;
            this.prooductService.getCommentsById(this.productId).done(function (response) {
                console.log(response);
                pub.commentsCount = response.length;
                pub.comments = new Array<Object>();
                for (var i = 0; i < response.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.comments.push(response[i]);
                    });

                }
            }).fail(function (response) {
                pub.buyerInfoMessage = 'Error while getting category information';
                console.log('Error: ' + response);
            });
        }

        private GetProductDetails()
        {
            var pub = this;
            this.prooductService.getProductById(this.productId).done(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.product = response;
                });
            }).fail(function (response) {
                pub.buyerInfoMessage = 'Error while getting category information';
                console.log('Error: ' + response);
            });
        }

        public AddToWishlist(id)
        {
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
                //this.$location.path('/home');
                jQuery('#add-product-id').hide();
            }
        }
    }
} 