/// <reference path="../reference.ts" />

module Controllers {
    export class BuyerProfileController {
        private $scope;
        private $localStorage;
        private buyInfoList: Array<Object>;

        constructor($scope, $rootScope, $localStorage) {
            $scope.vm = this;
            this.$scope = $scope;
            this.$localStorage = $localStorage;
            this.init();
        }

        public init() {
            this.buyInfoList = new Array<Object>();
            this.buyInfoList[0] = { Name: 'Product 1', Price: 100, Quantity: 1 };
            this.buyInfoList[1] = { Name: 'Product 2', Price: 200, Quantity: 2 };
        }
    }
} 