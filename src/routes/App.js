import React, { Component } from 'react';
import styles from './App.styl';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles["App-header"]}>
          <h1 className={styles["App-title"]}>Welcome to React</h1>
        </header>
        <p className={styles["App-intro"]}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
