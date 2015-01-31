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
        
        private : Array<Object>;
wishlistProducts

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
                
                //response = {};
                //var prod = [{ Name: "N1", Price: 100, Id: 0 }, { Name: "N1", Price: 100, Id: 2 }];
                //response.Products = prod;

                pub.wishlistProducts = new Array<Object>();
                for (var i = 0; i < response.Products.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.wishlistProducts.push(response.Products[i]);
                    });
                }
            }).fail(function (response) {
                pub.message = 'Error ' + response;
                console.log('Error: ' + response);

                //response = {};
                //var prod = [{ Name: "N1", Price: 100, Id: 0 }, { Name: "N1", Price: 100, Id: 2 }];
                //response.Products = prod;

                //pub.wishlistProducts = new Array<Object>();
                //for (var i = 0; i < response.Products.length; i++) {
                //    pub.$scope.$apply(function () {
                //        pub.wishlistProducts.push(response.Products[i]);
                //    });
                //}
            });
        }

       
    }
} 