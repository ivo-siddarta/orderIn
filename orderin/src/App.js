import React from 'react';
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from 'axios';

export default class App extends React.Component {
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
    axios.get('http://localhost:5000')
      .then(() => this.setState({isConnected: true}))
      .catch(() => this.setState({isConnected: false}))
      .finally(() => this.setState({isLoading: false}));
  }

  render() {
    return (
      <BrowserRouter>      
        {!this.state.isLoading && 
          <div className="container">
            {!this.state.isConnected ?
              <div className="p-3 mb-2 bg-danger text-center rounded text-white">
                <h3>Server not started or DB is not connected!</h3>
              </div> :
              <div>
                <Route exact path="/" render={ () => <LandingPage /> }/>
              </div>
            }
          </div>
        }
      </BrowserRouter>
    );
  }
}
