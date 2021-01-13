import React, {Component} from 'react';
import ProductService from 'Services/ProductService';
import {extractCategoriesAndProducts} from './helperFunc';
import {debounce} from 'Utilities/helpersFunc';
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
            
            currOrderBy: "desc",
            orderByIsFetching: false,
        }
        this._local = {
            searchWord: "",
            executeDebounce: false,
        }
        // lexical scope for 'this'
        this.handleProductDetails = this.handleProductDetails.bind(this);
        this.handleProductCategoryFilter = this.handleProductCategoryFilter.bind(this);
        this.handleProductCategorySearch = this.handleProductCategorySearch.bind(this);
        this.handleRequestLimitByDebounce = this.handleRequestLimitByDebounce.bind(this);
        this.handleProductsOrderBy = this.handleProductsOrderBy.bind(this);
    }

    async componentDidMount(){
        const apiCategories = await ProductService.getCategories();
        console.log('apiCategories', apiCategories);
        const {products, categories} = extractCategoriesAndProducts(apiCategories, true);
        console.log('products', products);
        this.setState({ 
            products, 
            productsCache: products,
            categoryFilter: categories
        });
    }

    async handleRequestLimitByDebounce(){
        const result = await ProductService.searchByCategory( this._local.searchWord );
        const {products, categories} = extractCategoriesAndProducts(result);
        this.setState({ 
            products, 
            categoryFilter: categories,
        });
        console.log('debounce');
    }

    handleProductsOrderBy(){
        const orderBy = this.state.currOrderBy === "desc" ? "asc" : "desc";   
        ( async () => {
            const result = await ProductService.getCategoriesOrderBy(orderBy);
            const {products, categories} = extractCategoriesAndProducts(result);

            console.log('AAA', result);

            this.setState({ 
                products, 
                categoryFilter: categories,
                currOrderBy: orderBy
            }); 
        })();    
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

    handleProductCategorySearch(keyword){
        if(keyword.length ===0) {
            this.setState({ products: this.state.productsCache });
            this._local.executeDebounce = true;
        } else {
            this._local.searchWord = keyword;
            this._local.executeDebounce = false;
        }
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
                }}>
                {this.state.categoryFilter.map((category, idx, arr) => (
                    <option key={idx} value={category}>{category}</option>
                ))}
            </select>
        </div>
    }

    // NOTE: When too many dom and logic transfer this to separate component
    renderSearchFilter() {
        return <div className="product-search-filter">
            <input placeholder="Search by category"
                onKeyPress={debounce((evt) => this.handleRequestLimitByDebounce(), 500)}
                onChange={(evt) => {
                    const value = evt.currentTarget.value;
                    this.handleProductCategorySearch(value);    
                }}
                />
        </div>
    }

    // NOTE: When too many dom and logic transfer this to separate component
    renderOrderByCtrl(){
        const value = this.state.currOrderBy === "desc" ? "DESC" : "ASC";
        return <div className="product-orderby">
            <button className="btn" onClick={this.handleProductsOrderBy} >{value}</button>
        </div>
    }

    render(){
        return (
            <div className="spa-content">
                <h1>Product Page</h1>

                <div className="product-filters">
                    {this.renderSearchFilter()}
                    {this.renderCategoryFilter()}
                    {this.renderOrderByCtrl()}
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