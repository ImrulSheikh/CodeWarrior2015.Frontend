class ProductService {
    public getProducts(catId) {
        var getUrl = new Constant().apiRoot + "/api/products/GetAllProduct?categoryId="+catId;
        return $.get(getUrl);
    }

} 