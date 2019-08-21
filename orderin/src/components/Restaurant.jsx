import React from 'react';

export default class Restaurants extends React.Component {
    constructor(props) {
        super(props);
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
                        {this.props.restaurant.order.map(order => 
                            <p>{order}</p>
                            )}
                        <footer className="blockquote-footer">Ivo React <cite title="Source Title">Source Title</cite></footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        );
    }
}