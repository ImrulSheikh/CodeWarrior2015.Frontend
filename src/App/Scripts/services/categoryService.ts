class CategoryService {
    public getCategories() {
        var getUrl = new Constant().apiRoot + "/api/categories/GetAll";
        return $.get(getUrl);
    }

    public getCategoryAttribute(catId) {
        var getUrl = new Constant().apiRoot + "/api/categories/GetAttributes/" + catId;
        return $.get(getUrl);
    }

} 