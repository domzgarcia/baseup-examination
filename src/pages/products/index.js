import React, {Component} from 'react';
import ProductService from 'Services/ProductService';
import {extractCategoriesAndProducts} from './helperFunc';
import {connect} from 'react-redux';
import {setProduct} from 'Actions/products.actions';
import {history} from 'Store';

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
            productsCache: [],
            categoryFilter: [],
            categoryFilterActive: "All",
        }
        // lexical scope for 'this'
        this.handleProductDetails = this.handleProductDetails.bind(this);
        this.handleProductCategoryFilter = this.handleProductCategoryFilter.bind(this);
    }

    async componentDidMount(){
        const apiCategories = await ProductService.getCategories();
        // console.log('apiCategories', apiCategories);
        const {products, categories} = extractCategoriesAndProducts(apiCategories);
        // console.log('products', products);
        this.setState({ 
            products, 
            productsCache: products,
            categoryFilter: categories
        });
    }

    handleProductDetails(product) {
        this.props.setProduct(product);
        history.push(`/products/${product.id}`);
    }

    handleProductCategoryFilter(filter){
        // Do reset first
        this.setState({
            products: this.state.productsCache,
        },
        () => {
            if(filter !== 'All') {
                const productsFilteredByCategory = this.state.products.filter(product => product.category===filter);
                this.setState({products: productsFilteredByCategory, categoryFilterActive: filter});
            } else {
                this.setState({ categoryFilterActive: 'All' });
            }
        });
    }
    
    // NOTE: When too many dom and logic transfer this to separate component
    renderProducts(){
        return this.state.products.map((product, idx) => (
            <li key={idx}>
                <div className="product">
                    <div className="img-wrapper">
                        <img className="imgsrc" src={product.image} alt={product.name}/>
                    </div>
                    <span className="line-divider"></span>
                    <div className="description">
                        <div className="name">
                            <small>Name</small>
                            <div className="elipsis -hyperlink" onClick={() =>{
                                this.handleProductDetails(product);
                            }}>{product.name}</div>
                        </div>
                        <div className="category">
                            <small>Category</small>
                            <div className="cbs-badge">
                                <div className="elipsis">{product.category}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        ))
    }

    // NOTE: When too many dom and logic transfer this to separate component
    renderCategoryFilter() {
        const isDisabled = this.state.categoryFilter.length === 0;
        return <div className="product-category-filter">
            <select
                disabled={isDisabled}
                value={this.state.categoryFilterActive}
                onChange={(evt) => {
                    const value = evt.currentTarget.value;
                    this.handleProductCategoryFilter(value);
                }}
            >
                {this.state.categoryFilter.map((category, idx, arr) => (
                    <option key={idx} value={category}>{category}</option>
                ))}
            </select>
        </div>
    }

    // NOTE: When too many dom and logic transfer this to separate component
    renderSearchFilter() {
        return <div className="product-search-filter">
            <input placeholder="Search a key here"/>
        </div>
    }

    render(){
        return (
            <div className="spa-content">
                <h1>Product Page</h1>

                <div className="product-filters">
                    {this.renderSearchFilter()}
                    {this.renderCategoryFilter()}
                </div>
                
                <div className="products">
                    <ul className="product-listing">
                        {this.renderProducts()}
                    </ul>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = {
    setProduct,
};

export default connect(
    null,
    mapDispatchToProps,
)(Products);