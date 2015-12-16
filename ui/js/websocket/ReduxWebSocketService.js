
import {createWebsocket, connecting, opened, closed, error} from '../actions/websocket';
import WebSocketService from './WebSocketService';

/**
 * An extended web socket service that adds redux dispatches to the lifecycle events
 */
class ReduxWebSocketService extends WebSocketService {
  constructor(url, name, dispatch) {
    super(url, name);
    this.onStart(o => {
      dispatch(createWebsocket(o));
      dispatch(connecting(o));
    });
    this.onOpened(o => dispatch(opened(o)));
    this.onClose(o => dispatch(closed(o)));
    this.onError(o => dispatch(error(o)));
  }
}

export default ReduxWebSocketService