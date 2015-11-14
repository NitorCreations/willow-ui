const initialState = {
    dummy: {},
}
export function dummy(state = initialState, action) {
    switch(action.type) {
        case 'FOO':
            return {
                ...state,
                dummy: {
                    foo: 1
                }
            }

        default:
            return state
    }
}