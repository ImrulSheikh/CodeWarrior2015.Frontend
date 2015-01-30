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
                this.callSaveProfileService();
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
            //var data = 'userName=' + this.accountModel.userName + '&password=' + this.accountModel.password +
            //    '&confirmPassword=' + this.accountModel.confirmPassword +
            //    '&fullName=' + this.accountModel.fullName + '&sex=' + this.accountModel.sex +
            //    "&address=" + this.accountModel.addressLine1 + '|' + this.accountModel.addressLine2 +
            //    '&phoneNumber=' + this.accountModel.mobile + '&email=' + this.accountModel.email;
            var data = 'userName=' + this.accountModel.userName + 
                '&fullName=' + this.accountModel.fullName + '&sex=' + this.accountModel.sex +
                "&address=" + this.accountModel.addressLine1 + '|' + this.accountModel.addressLine2 +
                '&phoneNumber=' + this.accountModel.mobile + '&email=' + this.accountModel.email;
            this.accountService.saveProfile(data, this.$localStorage.accessToken).done(function (response) {
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Saved successfully';
                });
            }).fail(function (response) {
                pub.$scope.$apply(function () {
                    console.log(response);
                    pub.profileEditMessage = 'Error while saving profile information';
                });
            });
        }

        private callGetProfileService() {
            var pub = this;
            this.accountService.getProfile(this.$localStorage.userName, this.$localStorage.accessToken).done(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.accountModel.userName = response.UserName;
                    pub.accountModel.fullName = response.FullName;
                    pub.accountModel.sex = response.Sex;
                    pub.accountModel.mobile = response.PhoneNumber;
                    pub.accountModel.email = response.Email;
                    pub.accountModel.addressLine1 = response.Address.split('|')[0];
                    pub.accountModel.addressLine2 = response.Address.split('|')[1];
                });
            }).fail(function (response) {
                console.log(response);
                pub.$scope.$apply(function () {
                    pub.profileEditMessage = 'Error while getting profile information';
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
            if (!this.checkPhoneNumber(this.accountModel.mobile)) {
                this.profileEditMessage = 'invalid mobile number';
                return false;
            }
            if (!this.accountModel.email) {
                this.profileEditMessage = 'email field is empty';
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
                jQuery('#add-product-id').show();
            } else {
                this.$location.path('/home');
                jQuery('#add-product-id').hide();
            }
        }

        private checkPhoneNumber(phone: string) {
            var regex = /^[\d\.\-]+$/;
            if (!regex.test(phone)) {
                return false;
            }
            return true;
        }
    }
} 