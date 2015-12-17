import React, { Component, PropTypes } from 'react';
import { CounterButton, WebSocketStatus, HostDisplay } from 'components'
require('./Home.scss')
export default class Home extends Component {
    render() {
        return (
            <div>
                <h2 className="title">Hello from Home.js</h2>
                <span>If you modify me browser automatically updates</span>
                <strong> without reloading the whole app</strong>
                <p>Debug panel on right shows state and history of Redux store. Ctrl-H hides the debug panel.</p>

                <CounterButton name="Foobar counter"/>
                <HostDisplay />
                <WebSocketStatus/>
            </div>
        )
    }
}

