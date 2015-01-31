class ProductService {
    public getProducts(catId) {
        var getUrl = new Constant().apiRoot + "/api/products/GetByCategory?categoryId="+catId;
        return $.get(getUrl);
    }

    public getProductById(id) {
        var getUrl = new Constant().apiRoot + "/api/Products/Get/" + id;
        return $.get(getUrl);
    }

    public getCommentsById(id) {
        //var getUrl = new Constant().apiRoot + "/api/Comments/Get?product=" + id;
        var getUrl = new Constant().apiRoot + "/api/Products/GetProductReviews?productId=" + id;
        return $.get(getUrl);
    }

    public getRecommendedProduct() {
        var getUrl = new Constant().apiRoot + "/api/Products/GetRecommended";
        return $.get(getUrl);
    }

    public saveComment(data, accessToken) {
        var getUrl = new Constant().apiRoot + "/api/Comments/Save";
        return $.ajax(getUrl, {
            type: "POST",
            //contentType: "application/json;charset=utf-8",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken
            },
            data: data
        });
    }

    public saveProduct(data, accessToken) {
        var getUrl = new Constant().apiRoot + "/api/Products/AddProduct";
        return $.ajax(getUrl, {
            type: "POST",
            //contentType: "application/json;charset=utf-8",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken
            },
            data: data
        });
	}
		
    public getProductBySearchKey(searchKey) {
        var getUrl = new Constant().apiRoot + "/api/Products/BySearchKey/"+searchKey;
        return $.post(getUrl);
    }
} 