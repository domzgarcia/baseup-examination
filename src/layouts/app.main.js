import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import asyncRoute from 'Utilities/asyncRoute';

const HeaderComponent = asyncRoute(() => import('Layouts/header.component'));
const FooterComponent = asyncRoute(() => import('Layouts/footer.component'));

const Home = asyncRoute(() => import('Pages/home'));

const Products = asyncRoute(() => import('Pages/products'));
const ProductInnerPage = asyncRoute(() => import('Pages/products/product-inner-page'))

class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="App">
                <HeaderComponent />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/products' component={Products}/>
                    <Route exact path='/products/:id' component={ProductInnerPage}/>
                </Switch>
                <FooterComponent />
            </div>
        )
    }
}

export default App;