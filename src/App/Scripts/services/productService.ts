class ProductService {
    public getProducts() {
        var getUrl = new Constant().apiRoot + "/api/products/GetAllProduct";
        return $.get(getUrl);
    }

} 