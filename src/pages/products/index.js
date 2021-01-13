import React, {Component} from 'react';
import ProductService from 'Services/ProductService';
import {combineProductFromCategories} from './helperFunc';
import {connect} from 'react-redux';
import {setProduct} from 'Actions/products.actions';
import {history} from 'Store';

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: [],
        }
        this.handleProductDetails = this.handleProductDetails.bind(this);
    }

    async componentDidMount(){
        const categories = await ProductService.getCategories();
        console.log(categories);
        const products = combineProductFromCategories(categories);
        // console.table(products);
        this.setState({ products,});
    }

    handleProductDetails(product) {
        this.props.setProduct(product);
        history.push(`/products/${product.id}`);
    }

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

    render(){
        return (
            <div className="spa-content">
                <h1>Product Page</h1>

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