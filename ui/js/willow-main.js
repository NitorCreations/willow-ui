import React from 'react';
import ReactDOM from 'react-dom';

// see http://rackt.org/history/stable/HashHistoryCaveats.html
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Redirect } from 'react-router';
import configureStore from './store/configure-store';
import routes from './routes';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { syncReduxAndRouter } from 'redux-simple-router';
import Immutable from 'immutable';

import startup from './service/Startup'

const history = createBrowserHistory()
const store = configureStore(Immutable.fromJS({}));

// syncReduxAndRouter assumes that store is plain js object.
// immutableStoreConverter gives a view of Immutable store as a plain js object
function immutableStoreConverter(store, reducerName) {
    return {
        getState: function () {
            return { [reducerName]: store.getState().get(reducerName).toJS() }
        },
        subscribe: function (listener) {
            store.subscribe(listener)
        },
        dispatch: function (action) {
            store.dispatch(action)
        }
    }
}
syncReduxAndRouter(history, immutableStoreConverter(store, 'routing'));

startup(store.dispatch)

ReactDOM.render(
    <div>
        <Provider store={store}>
            <Router history={history}>
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
