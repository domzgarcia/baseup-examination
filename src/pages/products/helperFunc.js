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

const resolveRatingFmt = (rating) => {
    const first = String(rating).substring(0,1);
    const getMax = (+first >= 5) ? 5 : +first;
    return getMax;
}

const flattenProductReviewRatings = (reviews) => {
    let avg = 0;
    let sum = 0;
    reviews.forEach(review => { 
        sum = sum + resolveRatingFmt(review.rating);
    });
    avg = sum / reviews.length;
    return avg.toFixed(1);
}

export {
    extractCategoriesAndProducts,
    flattenProductReviewRatings,
}