class AccountService {
    public getProfile(userName, accessToken) {
        var getUrl = new Constant().apiRoot + "/api/Account/UserProfile";
        //return $.get(getUrl);
        return $.ajax(getUrl, {
            type: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken
            }
        });
    }

    public saveProfile(data, accessToken) {
        var getUrl = new Constant().apiRoot + "/api/Account/UserProfile";
        return $.ajax(getUrl, {
            type: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken
            }
        });
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