/// <reference path="../reference.ts" />

module Controllers {
    export class ProductDetailsController {
        private categoryServicve = new CategoryService();
        private prooductService = new ProductService();
        private wishlistService = new WishlistService();
        private $scope;
        private $localStorage;
        private $location;
        private buyerInfoMessage = '';
        private categoryInfoMessage = '';
        private commentMessage = '';
        private productId;
        private isReview = '';
        private isWishList = '';
        private product: Object;
        private buyInfoList: Array<Object>;
        private categories: Array<Object>;
        private comments: Array<Object>;
        private commentsCount;

        private newComments;
        private starRating;

        constructor($scope, $rootScope, $localStorage, $location, $routeParams) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            this.productId = $routeParams.id;
            this.isReview = $routeParams.isReview;
            if ($routeParams.isReview == 'false')
            {
                this.isReview = 'display: none';
            }     
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

        public callWishlistService(id) {
            var pub = this;
            this.wishlistService.addToWishlist(id, this.$localStorage.accessToken).done(function (response) {

                alert(response);

            }).fail(function (response) {
                console.log('Error: ' + response);
            });
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

        public SaveComment()
        {
            if (!this.ValidateComment())
                return;

            var pub = this;
            var data = {
                "ProductId": this.productId,
                "Comment": this.newComments,
                "StarRating": this.starRating,
                "HelpfulHits": '0'
            };

            this.commentMessage = '';

            this.prooductService.saveComment(data, this.$localStorage.accessToken).done(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.commentMessage = 'Saved successfully';
                    pub.GetComments();
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    console.log(response);
                    pub.commentMessage = 'Error while saving profile information';
                });
            });
        }

        private ValidateComment()
        {
            if (!this.newComments) {
                this.commentMessage = 'Please write comment first';
                return false;
            }
            if (!this.starRating) {
                this.commentMessage = 'Please give rating';
                return false;
            }
            return true;
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
                this.isWishList = '';
            } else {
                //this.$location.path('/home');
                jQuery('#add-product-id').hide();
                this.isWishList = 'display: none';
            }

            console.log(this.isWishList);
        }
    }
} 