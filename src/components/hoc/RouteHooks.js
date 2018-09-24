import React, { Component } from 'react';

export default function(WrapComponent) {
  return class extends Component {
    componentDidCatch = (error, info) => {
      console.log(error, info);
    };
    componentDidMount = () => {
      window.scrollTo(0, 0);
    };

    render() {
      return <WrapComponent {...this.props} />;
    }
  };
}
