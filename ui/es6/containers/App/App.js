import React, { Component, PropTypes } from 'react';
/** App is top level container for all pages */
export default class App extends Component {
    static propTypes = {
        children: PropTypes.object.isRequired
    }

    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    render() {
        return (
            <div>
                <!-- navi component goes here -->
                <h2>Hello world</h2>
                <div className="page-content">
                    {this.props.children}
                </div>
                <!-- footer component goes here -->
            </div>
        )
    }

}
