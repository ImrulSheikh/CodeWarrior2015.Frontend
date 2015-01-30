class ProductService {
    public getProducts() {
        var getUrl = new Constant().apiRoot + "/api/products/GetAllProduct";
        return $.get(getUrl);
    }

    public getProductById(id) {
        var getUrl = new Constant().apiRoot + "/api/Products/Get/" + id;
        return $.get(getUrl);
    }

    public getCommentsById(id) {
        var getUrl = new Constant().apiRoot + "/api/Comments/Get?product=" + id;
        return $.get(getUrl);
    }
} 