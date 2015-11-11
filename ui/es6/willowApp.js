import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createHashHistory';
import { Router, Redirect } from 'react-router';

ReactDOM.render(
    <Provider>
        <Router history={createHistory()}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('willow-root')
)

