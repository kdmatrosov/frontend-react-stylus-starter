import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Index extends Component {
  render() {
    return (
      <div>
        Index
        <div><Link to='/demo'>Перейти на Demo</Link></div>
      </div>
    );
  }
}

export default Index;
