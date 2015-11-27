import Immutable from 'immutable';

const initialState = Immutable.fromJS({state: 'closed'})

export function websockets(state = initialState, action) {
  switch (action.type) {
    case 'WEBSOCKET_CREATED':
      return state.updateIn([action.payload.instance.id], () => {
        return Immutable.fromJS({
          instance: action.payload.instance,
          state: 'created',
          messages: [] //FIXME sami-airaksinen 11/27/15 : is this necessary??
        })
      });

    case 'WEBSOCKET_CONNECTING':
      return state.updateIn([action.payload.id, 'state'], () => 'connecting');

    case 'WEBSOCKET_OPENED':
      return state.updateIn([action.payload.id, 'state'], () => 'open');

    case 'WEBSOCKET_CLOSED':
      return state.updateIn([action.payload.id, 'state'], () => 'closed');

    case 'WEBSOCKET_ERROR':
      return state.updateIn([action.payload.id, 'state'], () => 'error');

    case 'WEBSOCKET_MESSAGE':
      // TODO add functionality
      console.log('got message', action)
      return state.updateIn([action.payload.id, 'messages'], (msgs) => Immutable.fromJS(msgs.push(action.payload.msg)))
  }
  return state
}
