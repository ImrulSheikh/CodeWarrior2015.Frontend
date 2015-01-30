/// <reference path="../reference.ts" />

module Controllers {
    export class AccountController {
        private accountService = new AccountService();
        private $scope;
        private $localStorage;
        private $location;
        private profileEditMessage = '';
        private accountModel = {
            userName: '', fullName: '', sex: '',
            addressLine1: '', addressLine2: '', mobile: '',
            email: '', password: '', confirmPassword: ''
        };
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
            this.callGetProfileService();
        }

        public saveProfile = function () {
            if (this.validateProfileEdit()) {
                
            }
        };

        public buyerButtonClick() {
            this.$location.path('/buyer');
        }

        public sellerButtonClick() {
            this.$location.path('/seller');
        }

        private callSaveProfileService() {
            var pub = this;
            this.profileEditMessage = 'Updating..';
            var data = 'userName=' + this.accountModel.userName + '&password=' + this.accountModel.password +
                '&confirmPassword=' + this.accountModel.confirmPassword +
                '&fullName=' + this.accountModel.fullName + '&sex=' + this.accountModel.sex +
                "&address=" + this.accountModel.addressLine1 + '|' + this.accountModel.addressLine2 +
                '&phoneNumber=' + this.accountModel.mobile + '&emailAddress=' + this.accountModel.email;
            this.accountService.saveProfile(data).done(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Saved successfully';
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Error while saving profile information';
                });
            });
        }

        private callGetProfileService() {
            this.accountModel.userName = this.$localStorage.userName;
            this.accountModel.fullName = 'Code Warrior';
            this.accountModel.sex = 'Male';
            this.accountModel.addressLine1 = 'addressLine1';
            this.accountModel.addressLine2 = 'addressLine2';
            this.accountModel.mobile = '34059834';
            this.accountModel.email = 'tbh.tilok@live.com';
            this.accountModel.password = 'cwcUser';

            var pub = this;
            var data = 'userName=' + this.$localStorage.userName;
            this.accountService.getProfile(data).done(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Saved successfully';
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Error while saving profile information';
                });
            });
        }

        private validateProfileEdit = function () {
            if (!this.accountModel.fullName) {
                this.profileEditMessage = 'user name field is empty';
                return false;
            }
            if (!this.accountModel.mobile) {
                this.profileEditMessage = 'mobile number field is empty';
                return false;
            }
            if (!this.accountModel.email) {
                this.profileEditMessage = 'email field is empty';
                return false;
            }
            if (!this.accountModel.password) {
                this.profileEditMessage = 'password field is empty';
                return false;
            }
            if (this.accountModel.password.length < 6) {
                this.profileEditMessage = 'passowrd must be atleast 6 character/digit long';
                return false;
            }
            if (this.accountModel.password != this.accountModel.confirmPassword) {
                this.signupMessage = 'passowrd not matched';
                return false;
            }
            return true;
        };

        private checkLoginStatus() {
            if (this.$localStorage.accessToken && this.$localStorage.accessToken != 'null') {
                jQuery('#user-id a').text(this.$localStorage.userName);
                jQuery('#login-id').hide();
                jQuery('#logout-id').show();
                jQuery('#user-id').show();
                jQuery('#account-id').show();
            } else {
                this.$location.path('/home');
            }
        }
    }
} 