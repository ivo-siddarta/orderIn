import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import StarInput from 'react-star-rating-component';

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

export default class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            inputName: null,
            inputLocation: null,
            inputRating: null,
            inputPrice: null,
            inputNote: null
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onBlurNameInput = this.onBlurNameInput.bind(this);
        this.onChangeLocationInput = this.onChangeLocationInput.bind(this);
        this.onClickRatingInput = this.onClickRatingInput.bind(this);
        this.onClickPriceInput = this.onClickPriceInput.bind(this);
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

    onBlurNoteInput(e) {
        e.preventDefault();
        this.setState({inputNote: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const restaurant = {
            "name": this.state.inputName,
            "location": this.state.inputLocation,
            "note": this.state.note,
            "rating": this.state.inputRating,
            "price": this.state.inputPrice
        }
        axios.post("http://localhost:5000/", restaurant);
        alert("Added \"" + this.state.inputName + "\" to orderin database!");
        window.location = "/";
    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <button onClick={this.openModal} className="btn btn-outline-primary">Add Restaurant</button>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Add Restaurant">
                    <form method="POST" onSubmit={this.onSubmit}>
                        <nav className="navbar navbar-light bg-light">
                            <a className="navbar-brand" href="#"><h4>Add Restaurant</h4></a>
                            <button type="button" onClick={this.closeModal} className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </nav>
                        <div className="form-group">
                            <label htmlFor="nameInput"><h6>Restaurant Name</h6></label>
                            <input type="text" className="form-control" id="nameInput" placeholder="Jayakarta Bistro" onBlur={this.onBlurNameInput} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="locationInput"><h6>Location</h6></label>
                            <select id="locationInput" className="form-control" onChange={this.onChangeLocationInput} required>
                                <optgroup label="Restaurant Location">
                                    <option value = ""></option>
                                    <option value = "Berkeley">Berkeley</option>
                                    <option value = "Oakland">Oakland</option>
                                    <option value = "San Francisco">San Francisco</option>
                                    <option value = "South Bay">South Bay</option>
                                    <option value = "New York">New York</option>
                                    <option value = "New Orleans">New Orleans</option>
                                    <option value = "Chicago">Chicago</option>
                                    <option value = "Seattle">Seattle</option>
                                    <option value = "London">London</option>
                                    <option value = "Tokyo">Tokyo</option>
                                    <option value = "Osaka">Osaka</option>
                                    <option value = "Kyoto">Kyoto</option>
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
                            <label htmlFor="noteInput">Notes</label>
                            <textarea className="form-control" id="noteInput" onBlur={this.onBlurNoteInput} rows="3" placeholder="Tell us what you think!"></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-9">
                            </div>
                            <div className="form-group col-md-3">
                                <button type="submit" className="btn btn-outline-primary">Add</button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}