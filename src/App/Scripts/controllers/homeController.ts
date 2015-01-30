/// <reference path="../reference.ts" />

module Controllers {

    
    export class HomeController {
        private categoryServicve = new CategoryService();
        private $localStorage;
        private $scope;
        private categories: Array<Object>;

        constructor($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.init();   
        }

        public init() {
            jQuery('#home-id').removeClass('active');
            jQuery('#home-id').addClass('active');
            this.checkLoginStatus();
            this.callCategoryService();
        }

        public callCategoryService() {
            var pub = this;
            this.categoryServicve.getCategories().done(function (response) {
                
                pub.categories = new Array<Object>();
                for (var i = 0; i < response.length;i++)
                {
                    pub.$scope.$apply(function () {
                        pub.categories.push(response[i]);
                    });
                    
                }
                console.log(pub.categories);


            })
                .fail(function (response) {
                console.log('Error: ' + response);
            });
        }

        private checkLoginStatus()
        {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
                jQuery('#add-product-id').show();
                jQuery('#user-id a').text(this.$localStorage.userName);
            } else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
                jQuery('#account-id').hide();
                jQuery('#add-product-id').hide();
            }
        }
    }
}