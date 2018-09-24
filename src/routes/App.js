import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as routes from './routesMapLoadable';
import styles from './App.styl';


class App extends Component {
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

export default App;
