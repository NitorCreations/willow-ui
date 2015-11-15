import { combineReducers } from 'redux'
import { counters } from './counters'
const { routeReducer } = require('redux-simple-router');

const rootReducer = combineReducers({
    counters,
    routing: routeReducer
})

export default rootReducer
