  
import React from 'react';
import Restaurant from './Restaurant';
import AddModal from './AddModal';
import Constants from '../constants/constants';
import axios from 'axios';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            restaurants: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.deleteRestaurant = this.deleteRestaurant.bind(this);
        this.getRestaurants = this.getRestaurants.bind(this);
        this.filterRestaurantByLocation = this.filterRestaurantByLocation.bind(this);
        this.onClickLocation = this.onClickLocation.bind(this);
    }
    
    componentDidMount() {
        this.getRestaurants();
    }
    
    deleteRestaurant(id) {
        axios.delete('http://localhost:5000/' + id);
        this.setState(prevState => ({
            restaurants: prevState.restaurants.filter(restaurant => restaurant._id !== id)
        }));
    }

    getRestaurants() {
        axios.get('http://localhost:5000/restaurants')
            .then(res => {
                this.setState({restaurants: res.data});
            })
            .catch(err => {
                console.log("Error Fetching Data from DB!");
                console.log("Error Log: " + err);
            });
    }

    filterRestaurantByLocation(location) {
        return this.state.restaurants.filter(restaurant => restaurant.location === location);
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
                    <div className="jumbotron">
                        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                            <h1 className="display-4">{this.state.location}</h1>
                        </div>
                        <AddModal />
                    </div> :
                    <div className="jumbotron">
                        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                            <h1 className="display-4">Hangry?</h1>
                            <p className="lead">We got you. Choose a location below</p>
                        </div>
                        <AddModal />
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
                {this.filterRestaurantByLocation(this.state.location).map(restaurant =>
                        <Restaurant key={restaurant._id} restaurant={restaurant} deleteRestaurant={this.deleteRestaurant}/>
                    )}
            </div>
        );
    }
}    