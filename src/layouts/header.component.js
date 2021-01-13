import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="app-header">
                <div className="cbs-container">
                    <ul className="site-navigation">
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/products" >Products</Link></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header;