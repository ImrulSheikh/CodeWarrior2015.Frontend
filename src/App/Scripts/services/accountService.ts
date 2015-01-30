class AccountService {
    public getProfile(data) {
        var getUrl = "http://localhost:64237/api/profile/get";
        return $.post(getUrl, data);
    }

    public saveProfile(data) {
        var saveUrl = "http://localhost:64237/api/profile/save"; 
        return $.post(saveUrl, data);
    }
} 