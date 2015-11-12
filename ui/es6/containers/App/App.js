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
        console.log('hje')

        return (
            <div>
                <small>Here goes navi</small>
                <h2>Hello world</h2>
                <div className="page-content">
                    {this.props.children}
                </div>
                <small>here goes footer</small>
            </div>
        )
    }

}
