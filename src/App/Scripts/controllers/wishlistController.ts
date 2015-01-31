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
        
        private wishlists: Array<Object>;


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
            this.wishlistService.getWishlist().done(function (response) {
                
                pub.wishlists = new Array<Object>();
                for (var i = 0; i < response.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.wishlists.push(response[i]);
                    });
                }
            }).fail(function (response) {
                pub.message = 'Error ' + response;
                console.log('Error: ' + response);
            });
        }

       
    }
} 