class LoginService {
    public login(data) {
        var loginUrl = new Constant().apiRoot + "/Token";
        return $.post(loginUrl, data);
    }

    public register(data) {
        var registerUrl = new Constant().apiRoot + "/api/account/register";
        return $.post(registerUrl, data);
    }
} 