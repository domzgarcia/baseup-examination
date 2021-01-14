import React, {Component} from 'react';
import ProductDetails from 'Pages/products/product-details';
import ProductReviews from 'Pages/products/product-reviews';

class ProductInnerPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="spa-content">
                <div className="products-inner-page">
                    <div className="cbs-cols">
                        <div className="cbs-col-50">
                            <ProductDetails />
                        </div>
                        <div className="cbs-col-50">
                            <ProductReviews />
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductInnerPage;