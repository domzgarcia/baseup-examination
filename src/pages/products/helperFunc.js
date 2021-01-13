const extractCategoriesAndProducts = (apiCategories, defaultOrder=false) =>{
    // concat products per categories
    let consolidateCategories = ["All"];
    const resolveCategoryName = (products, categoryName) => {

        consolidateCategories.push(categoryName);

        const withCategoryName = products.map(product => {
            return Object.assign(product, { category: categoryName },);
        });
        return withCategoryName;
    }
    
    let products = [];

    apiCategories.forEach(category => {
        products = [...products, ...resolveCategoryName(category.products, category.name)];
    })
    // desc order
    const descOrder = (a, b) => {
        const resolvedDateA = Date.parse(a.createdAt);
        const resolvedDateB = Date.parse(b.createdAt);
        if ( resolvedDateA < resolvedDateB ) return 1;
        if ( resolvedDateA > resolvedDateB ) return -1;
        return 0;
    }

    if(defaultOrder) products = products.sort(descOrder);

    return { 
        products, 
        categories: consolidateCategories
    };
}

export {
    extractCategoriesAndProducts,
}