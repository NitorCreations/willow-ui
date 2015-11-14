import React, { Component, PropTypes } from 'react';
export default class App extends Component {
    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        return (
            <div>
                <h1 className="title">Hello from App.js</h1>
                <ul>
                    <li><a href="#/">Frontpage</a></li>
                    <li><a href="#/settings">Settings</a></li>
                </ul>
                <main className="container">
                    {this.props.children}
                </main>

            </div>
        )
    }
}

