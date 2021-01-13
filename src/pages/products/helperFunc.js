const combineProductFromCategories = (categories) =>{
    // concat products per categories
    const resolveCategoryName = (products, categoryName) => {
        const withCategoryName = products.map(product => {
            return Object.assign(product, { category: categoryName },);
        });
        return withCategoryName;
    }
    let products = [];
    categories.forEach(category => {
        products = [...products, ...resolveCategoryName(category.products, category.name)];
    })
    // // desc order
    const descOrder = (a, b) => {
        const resolvedDateA = Date.parse(a.createdAt);
        const resolvedDateB = Date.parse(b.createdAt);
        if ( resolvedDateA < resolvedDateB ) return 1;
        if ( resolvedDateA > resolvedDateB ) return -1;
        return 0;
    }
    return products.sort(descOrder);
}

export {
    combineProductFromCategories,
}