import React, {Component} from 'react';
import {connect} from 'react-redux';
import ProductService from 'Services/ProductService';
import {setProductReviews, setReviewScene, setReviewsIsLoading} from 'Actions/products.actions';

class ProductReviewAdd extends Component {
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

    handleClickBackToReviewLists(){
        this.props.setReviewScene('view');
    }
    
    handleSubmit(){
        const {categoryId, productId} = this.props.currCategoryIdProductId;
        const {name, email, content, title, rating} = this.state; 

        ( async () => {
            this.props.setReviewsIsLoading();
            // TODO: submit new review
            const createReview = await ProductService.createProductReview(categoryId, productId, {
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

    componentDidMount(){
        // ...
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
                                onChange={this.handleChangeFullName}
                            />
                        </div>
                        <div className="cbs-form-group">
                            <label htmlFor="email">Email</label>
                            <input className="cbs-input" type="text" name="email" placeholder="Email" required
                                onChange={this.handleChangeEmail}
                            />
                        </div>
                        <div className="cbs-form-group">
                            <label htmlFor="title">Title</label>
                            <input className="cbs-input" type="text" name="title" placeholder="Title" required
                                onChange={this.handleChangeTitle}
                            />
                        </div>
                        <div className="cbs-form-group">
                            <label htmlFor="content">Content</label>
                            <input className="cbs-input" type="text" name="content" placeholder="Content" required
                                onChange={this.handleChangeContent}
                            />
                        </div>
                        <div className="cbs-form-group">
                            <label htmlFor="rating">Rating</label>
                            <select className="cbs-input"
                                name="rating"
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
                            <button className="primary-btn" type="submit">Make a review</button>
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
});

const mapDispatchToProps = {
    setProductReviews,
    setReviewScene,
    setReviewsIsLoading
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductReviewAdd);