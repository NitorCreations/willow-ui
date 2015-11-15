import { combineReducers } from 'redux-immutablejs';

import { counters } from './counters'
const { routeReducer } = require('redux-simple-router');

const rootReducer = combineReducers({
    counters
})

export default rootReducer
