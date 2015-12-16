import { combineReducers } from 'redux-immutablejs';
import Immutable from 'immutable';

import { counters } from './counters'
import { websockets } from '../websocket/WebSocketReducer'

const { routeReducer } = require('redux-simple-router');

// routeReducer assumes that store is plain js object
// immutableConverter converts Immutable object to and back plain js object
function immutableConverter(reducer) {
    return function(state, action) {
        const oldState = state ? state.toJS() : undefined
        const newState = reducer(oldState, action)
        // check for equal reference. If reducer doesn't modify, state neither should this converter
        if(oldState === newState) {
            return state
        }
        return Immutable.fromJS(newState)
    }
}

const rootReducer = combineReducers({
    counters,
    websockets,
    routing: immutableConverter(routeReducer)
});

export default rootReducer
