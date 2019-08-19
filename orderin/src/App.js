import React, { Component } from 'react';
import LandingPage from "./components"
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.checkServerConnection = this.checkServerConnection.bind(this);

    this.state = {
      isConnected: true,
      isLoading: true
    }
  }

  componentDidMount() {
    this.checkServerConnection();
  }

  checkServerConnection() {
    axios.get('http://localhost:8000')
      .then(res => this.setState({isConnected: true}))
      .catch(err => this.setState({isConnected: false}))
      .finally(() => this.setState({isLoading: false}));
  }

  render() {
    return (
      <div>      
        <nav className="navbar navbar-dark bg-dark sticky-top pt-3 pb-3 mb-5">
          <a className="navbar-brand" href="http://localhost:3000">
            OrderIn
          </a>
        </nav>
        {this.state.isLoading ? 
          <div></div> :
          <div className="container">
            {!this.state.isConnected ?
              <div className="p-3 mb-2 bg-danger text-center rounded text-white">
                <h3>Server not started or DB is not connected!</h3>
              </div> : <LandingPage/>
            }
          </div>
        }
      </div>
    );
  }
}
