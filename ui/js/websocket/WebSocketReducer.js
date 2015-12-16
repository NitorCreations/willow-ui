import Immutable from 'immutable';
import * as log from '../util/log';

const initialState = Immutable.fromJS({});

export function websockets(state = initialState, action) {
  switch (action.type) {
    case 'WEBSOCKET_CREATED':
      return state.updateIn([action.payload.instance.name], () => {
        return Immutable.fromJS({
          instance: action.payload.instance,
          state: 'created'
        })
      });

    case 'WEBSOCKET_CONNECTING':
      return state.updateIn([action.payload.instance.name, 'state'], () => 'connecting');

    case 'WEBSOCKET_OPENED':
      return state.updateIn([action.payload.instance.name, 'state'], () => 'open');

    case 'WEBSOCKET_CLOSED':
      return state.updateIn([action.payload.instance.name, 'state'], () => 'closed');

    case 'WEBSOCKET_ERROR':
      return state.updateIn([action.payload.instance.name, 'state'], () => 'error');
  }
  return state
}
