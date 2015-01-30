/// <reference path="../reference.ts" />

module Controllers {
    export class HomeController {
        private categoryServicve = new CategoryService();
        private $localStorage;
        constructor($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$localStorage = $localStorage;
            this.init();
        }

        public init() {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
            } else {
                jQuery('#login-id').show();
                jQuery('#logout-id').hide();
                jQuery('#user-id').hide();
                jQuery('#account-id').hide();
            }
            this.callCategoryService();
        }

        public callCategoryService() {
            this.categoryServicve.getCategories().done(function (response) {
                console.log(response);
            })
                .fail(function (response) {

            });
        }
    }
}