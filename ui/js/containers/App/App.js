import React, { Component, PropTypes } from 'react';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>Hello from App</h1>
                <span>If you modify me browser automatically updates</span>
                <strong> without reloading the whole app</strong>
            </div>
        )
    }
}

