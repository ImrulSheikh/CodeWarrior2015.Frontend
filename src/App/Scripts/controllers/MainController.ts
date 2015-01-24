/// <reference path="../reference.ts" />

module Controllers{
    export class MainController{
        message = " Imrul Hasan asdf";
        constructor($scope,logService:LogService){
            $scope.vm = this;
            logService.log('Some log');
        }
    }
}