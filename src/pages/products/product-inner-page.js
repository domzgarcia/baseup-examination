import React, {Component} from 'react';
import ProductDetails from 'Pages/products/product-details';
import ProductReviews from 'Pages/products/product-reviews';
import ProductService from 'Services/ProductService';
import {connect} from 'react-redux';
import {setProduct, setProductReviews, setReviewScene} from 'Actions/products.actions';

class ProductInnerPage extends Component {
    constructor(props){
        super(props);
    }

    async componentDidMount(){
        const {productId, categoryId} = this.props.currCategoryIdProductId;
        const product = await ProductService.getProductDetailsAndReviews(categoryId, productId);
        // set product
        this.props.setProduct(product);
        // set review
        this.props.setProductReviews(product.reviews);
        // reset
        this.props.setReviewScene('view');
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
                        <div className="cbs-clearfix"></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currCategoryIdProductId: state.products.currCategoryIdProductId,
});
const mapDispatchToProps = {
    setProduct,
    setProductReviews,
    setReviewScene
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductInnerPage);
