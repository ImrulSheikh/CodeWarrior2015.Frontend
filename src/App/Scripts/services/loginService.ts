class LoginService {
    public login(data) {
        var loginUrl = "http://localhost:64237/Token";
        return $.post(loginUrl, data);
    }

    public register(data) {
        var registerUrl = "http://localhost:64237/api/account/register";
        return $.post(registerUrl, data);
    }
} 