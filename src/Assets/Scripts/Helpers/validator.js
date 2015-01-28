var validator = {    
    validateLogin: function (username, password) {
        if (!username) {
            $('#login-message').val('User name field is empty');
            return false;
        }
        if (!password) {
            $('#login-message').val('Password field is empty');
            return false;
        }
        return true;
    },
    
    validateSingup : function (userName, fullName, sex, addressLine1, mobile, email, password, confirmPassword) {
        if (!userName) {
            $('#signup-message').val('user name field is empty');
            return false;
        }
        if (!fullName) {
            $('#signup-message').val('name field is empty');
            return false;
        }
        if (!sex || sex == 'Sex') {
            $('#signup-message').val('please select sex');
            return false;
        }
        if (!addressLine1) {
            $('#signup-message').val('address field is empty');
            return false;
        }
        if (!mobile) {
            $('#signup-message').val('mobile number field is empty');
            return false;
        }
        if (!email) {
            $('#signup-message').val('email field is empty');
            return false;
        }
        if (!password) {
            $('#signup-message').val('password field is empty');
            return false;
        }
        if (password.length < 6) {
            $('#signup-message').val('passowrd must be atleast 6 character/digit long');
            return false;
        }
        if (password != confirmPassword) {
            $('#signup-message').val('passowrd not matched');
            return false;
        }
        return true;
    }
};