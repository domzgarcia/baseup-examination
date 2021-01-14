import React, {Component} from 'react';
import {connect} from 'react-redux';
require("date-format-lite");

class ProductDetails extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // ...
    }
    
    render(){
        const {name, image, category, currency, price, details, createdAt, /**ratings */} = this.props.product;
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
                        <div className="cbs-badge">{category}</div>
                    </div>
                    <div className="cbs-col-50">
                        <p className="price">{`${currency} ${price}`}</p>
                    </div>
                    <div className="clearfix"></div>
                </div>
                
                <div className="ratings-wrapper">
                    <h1>TODO: Overall Ratings, Average from the Reviews</h1>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product,
});

export default connect(
    mapStateToProps,
    null,
)(ProductDetails);