/// <reference path="../reference.ts" />

module Controllers {
    export class AddProductController {
        private categoryServicve = new CategoryService();
        private productService = new ProductService();
        private $scope;
        private $localStorage;
        private $location;
        private accessToken;
        private selectedCategoryId;
        private selectedSubCategoryId;
        private buyInfoList: Array<Object>;
        private categories: Array<Object>;
        private subCategories: Array<Object>;

        private productName;
        private productDescription;
        private productPrice;
        private productQuantity;
        private productDiscount;
        private productAddMessage;

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
            this.callCategoryService();
        }


        public AddProduct()
        {
            if (!this.validateInput())
                return;

            var data = {
                'Name': this.productName,
                'Description': this.productDescription,
                'NumberOfUnits': this.productQuantity,
                'ImagePaths': '',
                'UnitPrice': this.productPrice,
                'CategoryId': this.selectedCategoryId,
                'SubCategoryId': this.selectedSubCategoryId,
                'Discount': this.productDiscount
            };

            var pub = this;
            this.productService.saveProduct(data, this.$localStorage.accessToken).done(function (response) {

                pub.categories = new Array<Object>();
                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.categories.push(response[i]);
                    });
                }

            }).fail(function (response) {
                console.log(response);
            });
        }

        public callCategoryService() {
            var pub = this;
            this.categoryServicve.getCategories().done(function (response) {

                pub.categories = new Array<Object>();
                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.categories.push(response[i]);
                    });
                }

            }).fail(function (response) {
                console.log('Error: ' + response);
            });
        }

        public GetSubCategories()
        {
            var pub = this;
            this.categoryServicve.getSubCategory(pub.selectedCategoryId).done(function (response) {

                pub.subCategories = new Array<Object>();
                console.log(response);
                for (var i = 0; i < response.length; i++) {
                    pub.$scope.$apply(function () {
                        pub.subCategories.push(response[i]);
                    });
                }

            }).fail(function (response) {
                console.log('Error: ' + response);
            });
        }

        private validateInput()
        {
            if (!this.productName) {
                this.productAddMessage = 'Please enter product name';
                return false;
            }
            if (!this.productPrice) {
                this.productAddMessage = 'Please enter product price';
                return false;
            }
            if (!this.productQuantity) {
                this.productAddMessage = 'Please enter product quantity';
                return false;
            }
            if (!this.productDescription) {
                this.productAddMessage = 'Please enter product dscription';
                return false;
            }
            return true;
        }

        private checkLoginStatus() {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                this.accessToken = this.$localStorage.accessToken;
                jQuery('#user-id a').text(this.$localStorage.userName);
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
                jQuery('#add-product-id').show();
                jQuery('#wishlist-id').show();
            } else {
                this.$location.path('/home');
                jQuery('#add-product-id').hide();
            }
        }
    }
} 