import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import Navbar from './components/navbar/Navbar'
import HomeScreen from './components/home_screen/HomeScreen'
import WireframeScreen from './components/wireframe_screen/WireframeScreen'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'
import DatabaseTester from './test/DatabaseTester'

function App(props) {
  //const { auth } = props
  //console.log(auth)
  if (true) {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/databaseTester' component={DatabaseTester} />
            <Route path='/wireframe/:id' component={WireframeScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  return null
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);
