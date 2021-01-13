import React, {Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import asyncRoute from 'Utilities/asyncRoute';

const HeaderComponent = asyncRoute(() => import('Layouts/header.component'));
const FooterComponent = asyncRoute(() => import('Layouts/footer.component'));
const Home    = asyncRoute(() => import('Pages/home'));

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
                </Switch>
                <FooterComponent />
            </div>
        )
    }
}

export default App;