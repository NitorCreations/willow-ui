import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  state: 'closed',
  receivedMessages: 0
})

export function websocket(state = initialState, action) {
  switch (action.type) {
    case 'WEBSOCKET_CONNECTING':
      return state.updateIn(['state'], () => 'connecting')

    case 'WEBSOCKET_OPENED':
      return state.updateIn(['state'], () => 'open')

    case 'WEBSOCKET_CLOSED':
      return state.updateIn(['state'], () => 'closed')

    case 'WEBSOCKET_ERROR':
      return state
        .updateIn(['state'], () => 'error')

    case 'WEBSOCKET_MESSAGE':
      // TODO add functionality
      console.log('got message', action)
      return state
        .updateIn(['receivedMessages'], (x) => x + 1)

  }
  return state
}
