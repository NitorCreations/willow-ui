import React, { Component, PropTypes } from 'react';
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
                    <li><Link to="/">Frontpage</Link></li>
                    <li><Link to="Shell">Shell</Link></li>
                </ul>
                <main className="container">
                    {this.props.children}
                </main>

            </div>
        );
    }
}

