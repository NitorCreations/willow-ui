import React, { Component, PropTypes } from 'react';
require('./Home.scss')
export default class Home extends Component {
    render() {
        return (
            <div>
                <h2 className="title">Hello from Home.js</h2>
                <span>If you modify me browser automatically updates</span>
                <strong> without reloading the whole app</strong>

            </div>
        )
    }
}

