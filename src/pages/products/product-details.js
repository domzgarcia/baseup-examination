import React, {Component} from 'react';
import {connect} from 'react-redux';
import {flattenProductReviewRatings} from './helperFunc';
require("date-format-lite");

class ProductDetails extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // ...
    }
    
    render(){
        const {name, image, createdAt, price, currency, details} = this.props.product;
        const resolveCategory = this.props.product && 
            this.props.product.category && 
            this.props.product.category.name || "";

        const resolveDate = new Date(createdAt).date('MMM-DD-YYYY');

        return (
            <div className="product-details">
                <h1 className="headline">Product Details</h1>
                
                <div className="img-wrapper">
                    <img src={image} />
                </div>
                
                <p className="name">{name}</p>
                
                <div className="date">{'Date: ' + resolveDate}</div>

                <p className="details">{details}</p>

                <div className="cbs-cols">
                    <div className="cbs-col-50">
                        <div className="cbs-badge">{resolveCategory}</div>
                    </div>
                    <div className="cbs-col-50">
                        <p className="price">{`${currency} ${price}`}</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
                
                <div className="ratings-wrapper">
                    <h1><span>⭐</span>&nbsp;Overall Ratings</h1>
                    {(this.props.reviews && this.props.reviews.length && flattenProductReviewRatings(this.props.reviews) || 0)}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product,
    reviews: state.products.reviews,
});

export default connect(
    mapStateToProps,
    null,
)(ProductDetails);