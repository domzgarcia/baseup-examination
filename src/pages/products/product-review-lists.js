import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resolveRatingFmt} from './helperFunc';
import { setReviewScene, setSingleProductReview} from 'Actions/products.actions';


class ProductReviewLists extends Component {
    constructor(props){
        super(props);
        this.handleEditReview = this.handleEditReview.bind(this);
    }
    
    componentDidMount(){
        // ...
    }

    handleEditReview(review){
        // TODO: Set Data for Edit
        this.props.setSingleProductReview(review);
        // TODO: Change scene
        this.props.setReviewScene('edit');
    }

    renderReviews(){
        
        return this.props.reviews.map((review, idx) => {
            const rate = resolveRatingFmt(review.rating)
            return <li key={idx}>
                <div className="user-review">
                    <div className="avatar-wrapper">
                        <img src={review.avatar}/>
                    </div>
                    <div className="details">
                        <div className="btn-edit" onClick={() => {
                            this.handleEditReview(review);
                        }}>EDIT</div>

                        <div className="author">
                            <div className="name">{`${review.name} (${review.email})`}</div>
                            <div className="title">{review.title}</div>
                            <div className="content">{review.content}</div>
                        </div>
                        <div className="actions">
                            <span>Ratings:
                                <span>⭐</span>
                                {rate}
                            </span>
                            <span>
                                <span className="like-btn">Like</span> {review.likes}
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        })
    }

    render(){
        return (
            <div className="product-review-lists">
                <ul>{this.renderReviews()}</ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reviews: state.products.reviews,
});

const mapDispatchToProps = {
    setReviewScene,
    setSingleProductReview
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductReviewLists);