class AccountService {
    public getProfile(userName) {
        var getUrl = new Constant().apiRoot + "/api/Profiles/GetBuyerProfile?userName=" + userName;

        return $.get(getUrl);
    }

    public saveProfile(data) {
        var saveUrl = new Constant().apiRoot + "/api/profile/save"; 
        return $.post(saveUrl, data);
    }

    public getBuyerProfile(userName) {
        var getUrl = new Constant().apiRoot + "/api/Profiles/GetBuyerProfile?userName=" + userName;

        return $.get(getUrl);
    }

    public getSellerProfile(userName) {
        var getUrl = new Constant().apiRoot + "/api/Profiles/GetSellerProfile?userName=" + userName;

        return $.get(getUrl);
    }
} 