import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'containers'
import './routes'

console.log('willow-main running')

ReactDOM.render(
    <div>
        <h1>Hello from React</h1>
        <App/>
        But hot reloading doesn't apply to willow-main.js
    </div>,
    document.getElementById('app-root')
);