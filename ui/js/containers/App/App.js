import React, { Component, PropTypes } from 'react';
require('./App.scss')
export default class App extends Component {
    render() {
        return (
            <div>
                <h2 className="title">Hello from App.js</h2>
                <span>If you modify me browser automatically updates</span>
                <strong> without reloading the whole app</strong>
            </div>
        )
    }
}

