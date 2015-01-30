class AccountService {
    public getProfile(data) {
        var getUrl = new Constant().apiRoot + "/api/profile/get";

        return $.post(getUrl, data);
    }

    public saveProfile(data) {
        var saveUrl = new Constant().apiRoot + "/api/profile/save"; 
        return $.post(saveUrl, data);
    }
} 