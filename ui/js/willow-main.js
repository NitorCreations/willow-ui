import React from 'react';
import ReactDOM from 'react-dom';

// see http://rackt.org/history/stable/HashHistoryCaveats.html
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Redirect } from 'react-router';
import configureStore from './store/configure-store';
import routes from './routes';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const store = configureStore();


ReactDOM.render(
    <div>
        <Provider store={store}>
            <Router history={createBrowserHistory()}>
                {routes}
            </Router>
        </Provider>
        <DebugPanel top right bottom>
            <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
    </div>
    ,
    document.getElementById('app-root')
);
