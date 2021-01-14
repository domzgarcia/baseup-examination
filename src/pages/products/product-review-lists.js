import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resolveRatingFmt} from './helperFunc';

class ProductReviewLists extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        // ...
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
    // setCategoryIdProductId,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductReviewLists);