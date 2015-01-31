/// <reference path="../reference.ts" />

module Controllers {
    export class WishlistController {
        private wishlistService = new WishlistService();
       
        private $scope;
        private $localStorage;
        private $location;
        private message = '';
       
        private productId;
        private product: Object;
        
        private wishlistProducts : Array<Object>;
        
        constructor($scope, $rootScope, $localStorage, $location, $routeParams) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.$location = $location;
            
            this.init();
        }

        public init() {
            jQuery('#home-id').removeClass('active');
           
            this.GetWishlists();

        }

        private GetWishlists() {
            var pub = this;
            this.wishlistService.getWishlist(this.$localStorage.accessToken).done(function (response) {
                
                pub.wishlistProducts = new Array<Object>();
                for (var i = 0; i < response.Products.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.wishlistProducts.push(response.Products[i]);
                    });
                }
            }).fail(function (response) {
                pub.message = 'Error ' + response;
            });
        }

        private DeleteWishlist(productId) {
            var pub = this;
            this.wishlistService.deletFromWishlist(productId,this.$localStorage.accessToken).done(function (response) {

                pub.message = response;

            }).fail(function (response) {
                pub.message = 'Error ' + response;
                });

            //window.location.reload();
        }

       
    }
} 