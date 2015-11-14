const initialState = {
    counters: {},
}
export function counters(state = initialState, action) {
    switch(action.type) {
        case 'INCREMENT':
            var currentCounters = state.counters

            var counterName = action.payload.name
            var currentValue = state.counters[counterName] || 0
            var newCounters = {
                ...currentCounters,
            }
            newCounters[counterName] = ++currentValue

            return {
                ...state,
                counters: newCounters
            }

        default:
            return state
    }
}