import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Demo extends Component {
  render() {
    return (
      <div>
        Demo
        <div><Link to='/'>Перейти на Index</Link></div>
      </div>
    );
  }
}

export default Demo;
