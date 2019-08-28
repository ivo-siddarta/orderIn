import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import StarInput from 'react-star-rating-component';
import EditLogo from '../style/icons/edit-2.svg';
import Constants from '../constants/constants';
import '../style/custom.css';

Modal.setAppElement('#root');

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      transform             : 'translate(-50%, -50%)'
    }
  };

export default class AddEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            inputName: "",
            inputLocation: "",
            inputRating: null,
            inputPrice: null,
            inputOrders: "",
            inputNote: ""
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onBlurNameInput = this.onBlurNameInput.bind(this);
        this.onChangeLocationInput = this.onChangeLocationInput.bind(this);
        this.onClickRatingInput = this.onClickRatingInput.bind(this);
        this.onClickPriceInput = this.onClickPriceInput.bind(this);
        this.onBlurOrdersInput = this.onBlurOrdersInput.bind(this);
        this.onBlurNoteInput = this.onBlurNoteInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
     
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    onBlurNameInput(e) {
        e.preventDefault();
        this.setState({inputName: e.target.value});
    }
    
    onChangeLocationInput(e) {
        e.preventDefault();
        this.setState({inputLocation: e.target.value});
    }
    onClickRatingInput(nextValue, prevValue, name) {
        this.setState({inputRating: nextValue});
    }

    onClickPriceInput(nextValue, prevValue, name) {
        this.setState({inputPrice: nextValue});
    }

    onBlurOrdersInput(e) {
        e.preventDefault();
        this.setState({inputOrders: e.target.value});
    }

    onBlurNoteInput(e) {
        e.preventDefault();
        this.setState({inputNote: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        let restaurant = {
            "location": this.state.inputLocation,
            "note": this.state.note,
            "rating": this.state.inputRating,
            "orders": this.state.inputOrders,
            "price": this.state.inputPrice
        }
        if (this.props.isEdit) {
            restaurant.name = this.props.restaurant.name;
            axios.put("http://localhost:5000/", restaurant)
                .catch( err => {
                    alert("Error update database!");
                    window.location = "/";
                });
            alert("Thank you for helping us rate " + restaurant.name + " !")
        } else {
            restaurant.name = this.state.inputName;
            axios.post("http://localhost:5000/", restaurant)
                .catch( err => {
                    alert("Restaurant already exist!");
                    window.location = "/";
                });
            alert("Added " + restaurant.name + " to orderin database!")
        }
        window.location = "/";
    }

    render() {
        return (
            <div>
                {this.props.isEdit ?
                    <img src={EditLogo} className="cardButton" onClick={this.openModal}/> :
                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button onClick={this.openModal} className="btn btn-outline-primary">Add Restaurant</button>
                            </div>
                        </div>
                    </div>
                }
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add Restaurant">
                    <form method="POST" onSubmit={this.onSubmit}>
                        <nav className="navbar navbar-light bg-light">
                            <div className="navbar-brand">
                                { this.props.isEdit ?
                                    <h5>Rate Restaurant</h5> :
                                    <h5>New Restaurant</h5>
                                }
                            </div>
                            <button type="button" onClick={this.closeModal} className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </nav>
                        <div className="form-group">
                            <label htmlFor="nameInput"><h6>Restaurant Name</h6></label>
                            { this.props.isEdit ?
                                <p>{this.props.restaurant.name}</p> :
                                <input type="text" className="form-control" id="nameInput" placeholder="Jayakarta Bistro" onBlur={this.onBlurNameInput} required/>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="locationInput"><h6>Location</h6></label>
                            <select id="locationInput" className="form-control" onChange={this.onChangeLocationInput} required>
                                <optgroup label="Restaurant Location">
                                    <option></option>
                                    {Constants.LOCATIONS.map( location => 
                                        <option value={location} selected={this.props.restaurant && this.props.restaurant.location === location}>{location}</option>
                                    )}
                                </optgroup>
                            </select>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <h6>Rating</h6> 
                                <StarInput 
                                name="inputRating" 
                                starCount={5}
                                onStarClick={this.onClickRatingInput}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <h6>Price</h6>  
                                <StarInput 
                                name="inputPrice" 
                                starCount={5}
                                renderStarIcon={() => <span><b>$</b></span>}
                                onStarClick={this.onClickPriceInput}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ordersInput"><h6>Orders</h6></label>
                            <textarea className="form-control" id="noteInput" onBlur={this.onBlurOrdersInput} rows="2" placeholder="Apple, Banana, Candy"></textarea>
                            <small>Comma Separated</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="noteInput"><h6>Notes</h6></label>
                            <textarea className="form-control" id="noteInput" onBlur={this.onBlurNoteInput} rows="3" placeholder="Tell us what you think!"></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-9">
                            </div>
                            <div className="form-group col-md-3">
                                { this.props.isEdit ?
                                    <button type="submit" className="btn btn-outline-primary">Review</button>:
                                    <button type="submit" className="btn btn-outline-primary">Add</button>
                                }
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}