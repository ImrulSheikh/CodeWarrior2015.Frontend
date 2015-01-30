class LoginService {
    public login(data) {
        var loginUrl = "http://localhost:41591/Token";
        return $.post(loginUrl, data);
    }

    public register(data) {
        var registerUrl = "http://localhost:41591/api/account/register";
        return $.post(registerUrl, data);
    }
} 