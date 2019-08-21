  
import React from 'react';
import Restaurant from './Restaurant';
import Constants from '../constants/constants';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null
        };
        this.getRestaurants = this.filterRestaurantByLocation.bind(this);
        this.onClickLocation = this.onClickLocation.bind(this);
    }
    
    filterRestaurantByLocation(location) {
        return Constants.RESTAURANTS.filter(restaurant => restaurant.location === location);
    }
    onClickLocation(e) {
        e.preventDefault();
        this.setState({location: e.target.value});
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal">OrderIn</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <a className="p-2 text-dark">Foodies</a>
                        <a className="p-2 text-dark">Why OrderIn</a>
                    </nav>
                    <a className="btn btn-outline-primary">Contribute</a>
                </div>
                {this.state.location ?
                    <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                        <h1 className="display-4">{this.state.location}</h1>
                    </div> :
                    <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                        <h1 className="display-4">Hangry?</h1>
                        <p className="lead">We got you. Choose a location below</p>
                    </div>
                }
                <div className="container">
                    <div className="btn-group" role="group">
                        {Constants.LOCATIONS.map( location =>
                            <button type="button" key={location} value={location} onClick={this.onClickLocation}
                             className="btn btn-outline-primary"  data-toggle="button" aria-pressed="true">{location}</button>
                            )}
                    </div>
                </div>
                {this.filterRestaurantByLocation(this.state.location).map (restaurant =>
                        <Restaurant key={restaurant.id} restaurant={restaurant}/>
                    )}
            </div>
        );
    }
}    