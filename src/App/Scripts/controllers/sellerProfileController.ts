/// <reference path="../reference.ts" />

module Controllers {
    export class SellerProfileController {
        private $scope;
        private $localStorage;
        private sellerInfoList: Array<Object>;

        constructor($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.init();
        }

        public init() {
            this.sellerInfoList = new Array<Object>();
            this.sellerInfoList[0] = { Name: 'Product 1', Price: 100, Quantity: 1 };
            this.sellerInfoList[1] = { Name: 'Product 2', Price: 200, Quantity: 2 };
        }
    }
} 