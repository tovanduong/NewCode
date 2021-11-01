import Main from './Component/mainComponent';
import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import { history } from './helps/history';

class App extends Component {

  render() {
    return (
        // <BrowserRouter history={history}>
          <div className="App">
            <Main />
          </div>
        // </BrowserRouter>
    );
  }
}
export default App;