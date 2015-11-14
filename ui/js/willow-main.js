import React from 'react';
import ReactDOM from 'react-dom';

// see http://rackt.org/history/stable/HashHistoryCaveats.html
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Redirect } from 'react-router';
import configureStore from './store/configure-store';
import routes from './routes';

const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            {routes}
        </Router>
    </Provider>
    ,
    document.getElementById('app-root')
);
