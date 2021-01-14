import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductReviewLists from 'Pages/products/product-review-lists';
import {setReviewScene} from 'Actions/products.actions';
import ProductReviewAdd from 'Pages/products/product-review-add';

class ProductReviews extends Component {
    constructor(props){
        super(props);
        this.handleAddReview = this.handleAddReview.bind(this);
    }
    
    componentDidMount(){
        // ...
    }

    handleAddReview(){
        this.props.setReviewScene('add');
    }

    renderReviewsScene(){
        const {reviewScene} = this.props;
        switch(reviewScene){
            case 'view':
            return <ProductReviewLists />;
            case 'edit':
            return <div>Edit</div>
            case 'add':
            return <ProductReviewAdd />
        }
    }
    render(){
        return (
            <div className="product-reviews">
                <div className="header">
                    <h1 className="headline">Product Reviews</h1>   
                    <div className="action">
                    {this.props.reviewScene === 'view'
                    ? <div className="btn-add" onClick={this.handleAddReview}>Add Review</div>
                    : <span></span>}
                    </div>
                </div>
                <div className="scenes">
                    {this.renderReviewsScene()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reviewScene: state.products.reviewScene,
});

const mapDispatchToProps = {
    setReviewScene,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductReviews);