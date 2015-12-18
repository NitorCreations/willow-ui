
import {createWebsocket, connecting, opened, closed, error} from './WebSocketActions';
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
    this._dispatch = dispatch;
  }

  /**
   * Transform the received message to a redux action. The function should return a valid redux action or
   * undefined to skip dispatching.
   *
   * @param fn the function to call on message.
   * @returns {ReduxWebSocketService} this for chaining
   */
  onMsgDispatch(fn) {
    this.onMsg(({msg}) => {
      var action = fn(msg);
      if (typeof action !== 'undefined') {
        this._dispatch(action)
      }
    });
    return this;
  }
}

export default ReduxWebSocketService