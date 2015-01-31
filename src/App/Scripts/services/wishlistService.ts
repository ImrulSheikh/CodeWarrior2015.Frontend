class WishlistService {
    public getWishlist(accessToken) {
        var url = new Constant().apiRoot + "/api/Wishlist/GetCurrent";
        return $.ajax(url, {
            type: "GET",
            headers: {
                //"Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken
            }
        });
    }

    public addToWishlist(id, accessToken) {
        var url = new Constant().apiRoot + "/api/Wishlist/Add/" + id;
        return $.ajax(url, {
            type: "POST",
            headers: {
                //"Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken
            }
        });
    }

    public deletFromWishlist(id, accessToken) {
        var url = new Constant().apiRoot + "/api/Wishlist/Delete/" + id;
        return $.ajax(url, {
            type: "POST",
            headers: {
                //"Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken
            }
        });
    }

} 