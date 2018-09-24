import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from './routesMapLoadable';
import styles from './App.styl';
import * as userActions from '../store/actions/user';

import { connect } from 'react-redux';

class App extends Component {
  static getDerivedStateFromProps(nextProps) {
    if (typeof nextProps.auth !== 'boolean') {
      nextProps.checkAuth();
    }
    return null;
  }
  render() {
    return (
      <BrowserRouter>
        <div className={styles.App}>
          <Switch>
            <Route path="/" exact component={routes.Index}/>
            <Route path="/demo" component={routes.Demo}/>
            <Route component={routes.NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  userActions
)(App);
