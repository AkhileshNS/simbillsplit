
// External Libraries
import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

// Internal Libraries
import './App.css';

// Page Components
import Bill from './pages/Bill/Bill';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Bill} exact/>
        </Switch>
      </div>
    );
  }
}

export default App;
