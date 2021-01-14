import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resolveRatingFmt} from './helperFunc';
import { setReviewScene, setSingleProductReview, setProductReviews} from 'Actions/products.actions';


class ProductReviewLists extends Component {
    constructor(props){
        super(props);
        this.handleEditReview = this.handleEditReview.bind(this);
        this.handleLikeCount = this.handleLikeCount.bind(this);
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

    handleLikeCount(review){
        const mutated = this.props.reviews.map( rv => {
            if( +rv.id === +review.id){
                const rvm = Object.assign({}, review);
                rv.likes = +rvm.likes + 1;
            }
            return rv;
        });
        this.props.setProductReviews(mutated);
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
                            {review.verified && <span className="v-green"><span>✅</span>Verified</span> || <span className="v-red"><span>🔴</span>Unverified</span>}
                            <span>Ratings:
                                <span>⭐</span>
                                {rate}
                            </span>
                            <span onClick={() => {
                                this.handleLikeCount(review);
                            }}>
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
    setSingleProductReview,
    setProductReviews
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductReviewLists);