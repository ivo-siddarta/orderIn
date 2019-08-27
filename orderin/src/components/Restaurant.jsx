import React from 'react';
import PlusLogo from '../style/icons/plus.svg';
import DeleteLogo from '../style/icons/trash-2.svg';
import EditLogo from '../style/icons/edit-2.svg';
import '../style/custom.css';

export default class Restaurants extends React.Component {
    onClickDelete(e) {
        e.preventDefault();
        this.props.deleteRestaurant(this.props.restaurant._id);
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <h5 className="card-header">
                        {this.props.restaurant.name}
                    </h5>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                        {this.props.restaurant.orders.map(order => 
                            <p>{order}</p>
                            )}
                        <footer className="blockquote-footer">Ivo React
                            <cite title="Source Title">Source Title</cite>
                            <img src={DeleteLogo} onClick={e => this.onClickDelete(e)} className="cardButton"/>
                            <img src={EditLogo} className="cardButton"/>
                        </footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        );
    }
}