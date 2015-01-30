class CategoryService {
    public getCategories() {
        var getUrl = new Constant().apiRoot + "/api/categories/GetAllCategory";
        return $.get(getUrl);
    }

    public getCategoryAttribute(catId) {
        var getUrl = new Constant().apiRoot + "/api/categories/GetCategoryAttribute?categoryId=" + catId;
        return $.get(getUrl);
    }

} 