import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductService from 'Services/ProductService';
import {resolveRatingFmt} from './helperFunc';

import {setReviewScene, setProductReviews, setReviewsIsLoading} from 'Actions/products.actions';

class ProductReviewEdit extends Component {
    constructor(props){
        super(props);

        this.state = {
            /*  I applied required but usually in my project I use Formik,Yup,Antd. */
            name: "",
            email: "",
            title: "",
            content: "",
            rating: 0,
        }

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleClickBackToReviewLists = this.handleClickBackToReviewLists.bind(this);
    }

    componentDidMount(){
        const { name, email, title, content, rating, } = this.props.review;
        this.setState({ name, email, title, content, rating: +resolveRatingFmt(rating), });
    }

    handleClickBackToReviewLists(){
        this.props.setReviewScene('view');
    }
    
    handleSubmit(){
        const {categoryId, productId} = this.props.currCategoryIdProductId;
        const {id} = this.props.review;
        const {name, email, content, title, rating} = this.state; 

        ( async () => {
            this.props.setReviewsIsLoading();

            // TODO: submit updated review,
            const updateReview = await ProductService.updateProductReview(categoryId, productId, id /* reviewId */, {
                name, email, content, title, rating 
            });

            // TODO: Update reviews
            const updatedReviews = await ProductService.getProductReviews(categoryId, productId);
            this.props.setProductReviews(updatedReviews);

            // TODO: Change to Listing again
            this.props.setReviewScene('view');
            this.props.setReviewsIsLoading();
        })()
    }

    handleChangeFullName(evt){
        this.setState({ name: evt.target.value });
    }
    handleChangeEmail(evt){
        this.setState({ email: evt.target.value });
    }
    handleChangeContent(evt){
        this.setState({ content: evt.target.value });
    }
    handleChangeTitle(evt){
        this.setState({ title: evt.target.value });
    }
    handleChangeRating(evt){
        const value = evt.target.value;
        this.setState({ rating: value });
    }

    render(){
        const {name, email, content, title, rating} = this.state; 

        return (
            <div className="product-review-add">

                    {this.props.isReviewLoading && <div className="review-loader-indicator"></div> || <span></span>}

                    <form className="product-review-form" onSubmit={(evt) => {
                        evt.preventDefault();
                        this.handleSubmit();
                    }}>
                        <div className="cbs-form-group">
                            <label htmlFor="name">Full Name</label>
                            <input className="cbs-input" type="text" placeholder="Full Name" required
                                value={name}
                                onChange={this.handleChangeFullName}
                            />
                        </div>
                        <div className="cbs-form-group">
                            <label htmlFor="email">Email</label>
                            <input className="cbs-input" type="text" name="email" placeholder="Email" required
                                value={email}
                                onChange={this.handleChangeEmail}
                            />
                        </div>
                        <div className="cbs-form-group">
                            <label htmlFor="title">Title</label>
                            <input className="cbs-input" type="text" name="title" placeholder="Title" required
                                value={title}
                                onChange={this.handleChangeTitle}
                            />
                        </div>
                        <div className="cbs-form-group">
                            <label htmlFor="content">Content</label>
                            <input className="cbs-input" type="text" name="content" placeholder="Content" required
                                value={content}
                                onChange={this.handleChangeContent}
                            />
                        </div>
                        <div className="cbs-form-group">
                            <label htmlFor="rating">Rating</label>
                            <select className="cbs-input"
                                name="rating"
                                value={+resolveRatingFmt(rating)}
                                onChange={this.handleChangeRating}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="btn-wrapper">
                            <span className="back-btn"
                                onClick={this.handleClickBackToReviewLists}
                            >&lt;&lt;Back</span>
                            <button className="primary-btn" type="submit">Update</button>
                        </div>
                    </form>
                    <div className="cbs-clearfix"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currCategoryIdProductId: state.products.currCategoryIdProductId,
    isReviewLoading: state.products.isReviewLoading,
    review: state.products.review,
});

const mapDispatchToProps = {
    setReviewScene,
    setReviewsIsLoading,
    setProductReviews,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductReviewEdit);