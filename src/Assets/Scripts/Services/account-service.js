var accountService = {
    login: function () {
        var userName = $('#login-userName').val();
        var password = $('#login-password').val();
        if (validator.validateLogin(userName, password)) {
            var loginUrl = "http://localhost:64237/Token";
            var data = 'userName=' + userName + '&password=' + password + '&confirmPassword=' + password + '&grant_type=password';
            
            $.post(loginUrl, data).success(function (response) {
                localStorage.accessToken = response.access_token;
                localStorage.userName = userName;
                helper.showLoginMenu();
                location.href = '/Home/Index';
            }).error(function (response) {
                $('#login-message').val('invalid user name or password');
            });
        }
    },
    
    signup: function () {
        var userName = $('#signup-userName').val();
        var fullName = $('#signup-fullName').val();
        var sex = $('#signup-sex').val();
        var addressLine1 = $('#signup-addressLine1').val();
        var addressLine2 = $('#signup-addressLine2').val();
        var mobile = $('#signup-mobile').val();
        var email = $('#signup-email').val();
        var password = $('#signup-password').val();
        var confirmPassword = $('#signup-confirmPassword').val();

        if (validator.validateSingup(userName, fullName, sex, addressLine1, mobile, email, password, confirmPassword)) {
            $('#signup-message').val('Registering..');
            var registerUrl = "http://localhost:64237/api/account/register";
            var data = 'userName=' + userName + '&password=' + password +
                '&confirmPassword=' + confirmPassword +
                '&fullName=' + fullName + '&sex=' + sex +
                "&address=" + addressLine1 + '|' + addressLine2 +
                '&phoneNumber=' + mobile + '&emailAddress=' + email;
            
            $.post(registerUrl, data).success(function (response) {
                $('#signup-message').val('Please login to your email address for registration cofirmation');
            }).error(function (response) {
                $('#signup-message').val('Invalid request, please check all the fields again');
            });
        }
    }
};