import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: React.PropTypes.any
  };

  render() {
    return (
      <div>
        <h1 className="title">Hello from App.js</h1>
        <ul>
          <li><Link to="/ui/">Frontpage</Link></li>
          <li><Link to="/ui/Shell">Shell</Link></li>
          <li><Link to="/ui/Radiator/group-1">Radiator</Link></li>
        </ul>
        <main className="container">
          {this.props.children}
        </main>

      </div>
    );
  }
}

