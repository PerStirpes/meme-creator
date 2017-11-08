import React, { Component } from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import { Route,  Switch} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import NewMeme from './NewMeme'
import Home from './Home'
import requireAuth from './requireAuth'

// <Route render={() => <h3>No Match</h3>} />

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <div className="App-header">
          <h1>Fun with memez</h1>
        </div>
        <Switch>
          
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/new' component={requireAuth(NewMeme)} />
          <Route exact path='/' component={Home} />
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
