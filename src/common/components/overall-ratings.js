import React, {Component} from 'react';
import {connect} from 'react-redux';
import {resolveRatingFmt} from 'Pages/products/helperFunc';

class RatingsBreakdown extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        // ...
    }

    render(){
        const {reviews} = this.props;
        let countFor1 = 0;
        let countFor2 = 0;
        let countFor3 = 0;
        let countFor4 = 0;
        let countFor5 = 0;

        reviews && reviews.forEach((review) => {
            switch(+resolveRatingFmt(review.rating)){
                case 1: countFor1 += 1; break;
                case 2: countFor2 += 1; break;
                case 3: countFor3 += 1; break;
                case 4: countFor4 += 1; break;
                case 5: countFor5 += 1; break;
            }
        });

        return (
            <div className="overall-rating-breakdown">
                <p>Overall Ratings breakdown</p>
                <ul>
                    <li>{`1 start - ${countFor1}`}</li>
                    <li>{`2 start - ${countFor2}`}</li>
                    <li>{`3 start - ${countFor3}`}</li>
                    <li>{`4 start - ${countFor4}`}</li>
                    <li>{`5 start - ${countFor5}`}</li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reviews: state.products.reviews,
});

export default connect(
    mapStateToProps,
    null,
)(RatingsBreakdown);