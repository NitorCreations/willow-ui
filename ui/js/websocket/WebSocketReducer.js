import Immutable from 'immutable';
import * as log from '../util/log';
import {WebSocketActions} from './WebSocketActions';

const initialState = Immutable.fromJS({});

export function websockets(state = initialState, action) {
  switch (action.type) {
    case WebSocketActions.WEBSOCKET_CREATED:
      return state.updateIn([action.payload.instance.name], () => {
        return Immutable.fromJS({
          instance: action.payload.instance,
          state: 'created'
        })
      });

    case WebSocketActions.WEBSOCKET_CONNECTING:
      return state.updateIn([action.payload.instance.name, 'state'], () => 'connecting');

    case WebSocketActions.WEBSOCKET_OPENED:
      return state.updateIn([action.payload.instance.name, 'state'], () => 'open');

    case WebSocketActions.WEBSOCKET_CLOSED:
      return state.updateIn([action.payload.instance.name, 'state'], () => 'closed');

    case WebSocketActions.WEBSOCKET_ERROR:
      return state.updateIn([action.payload.instance.name, 'state'], () => 'error');
  }
  return state
}
