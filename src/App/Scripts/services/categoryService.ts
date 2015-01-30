class CategoryService {
    public getCategories() {
        var getUrl = new Constant().apiRoot + "/api/categories/GetAllCategory";
        return $.get(getUrl);
    }

} 