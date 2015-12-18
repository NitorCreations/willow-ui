import {Map, fromJS} from 'immutable';
import {WebSocketActions} from './WebSocketActions';
import * as log from '../util/log';

const initialState = Map({});

export function websockets(state = initialState, action) {
  switch (action.type) {
    case WebSocketActions.WEBSOCKET_CREATED:
      return state.setIn([action.payload.instance.name], fromJS({
        instance: action.payload.instance,
        state: 'created'
      }));

    case WebSocketActions.WEBSOCKET_CONNECTING:
      return state.updateIn([action.payload.instance.name, 'state'], () => 'connecting');

    case WebSocketActions.WEBSOCKET_OPENED:
      return state.updateIn([action.payload.instance.name, 'state'], () => 'open');

    case WebSocketActions.WEBSOCKET_CLOSED:
      log.debug('Closing websocket: ' + action.payload.instance.name);
      return state.delete(action.payload.instance.name);

    case WebSocketActions.WEBSOCKET_ERROR:
      return state.updateIn([action.payload.instance.name, 'state'], () => 'error');
  }
  return state
}
