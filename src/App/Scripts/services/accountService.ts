class AccountService {
    public getProfile(data) {
        
    }

    public saveProfile(data) {
        var saveUrl = "http://localhost:64237/api/profile/get"; 
        return $.post(saveUrl, data);
    }
} 