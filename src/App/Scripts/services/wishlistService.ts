class WishlistService {
    public getWishlist() {
        var url = new Constant().apiRoot + "/api/Wishlist/GetCurrent";
        return $.get(url);
    }

    public addToWishlist(id) {
        var url = new Constant().apiRoot + "/api/Wishlist/Add/?productId=" + id;
        return $.post(url);
    }

} 