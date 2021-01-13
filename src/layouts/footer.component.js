import React, {Component} from 'react';

class Footer extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <footer>
                <div className="cbs-container">
                    <div className="footnote">ReactJS Application created with
                    <span role="img" aria-label="heart">❤️</span></div> 
                </div>
            </footer>
        )
    }
}

export default Footer;