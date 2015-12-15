import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/websocket';
import * as log from '../util/log'

class WebSocketService {
  constructor(dispatch, url, id) {
    this.url = url;
    this.id = id;
    this.actions = bindActionCreators(actionCreators, dispatch);
    log.log(this.actions);
  }

  startWebSocket() {
    this.ws = new WebSocket(this.url);
    this.actions.createWebsocket(this);
    this.actions.connecting(this.id);
    this.ws.onopen = () => {
      log.info('WebSocket opened to ', this.url);
      this.actions.opened(this.ws, this.id);
    };
    this.onerror = (e) => {
      log.error('WebSocket error', e);
      this.actions.error()

    };
    this.onclose = (e) => {
      log.info('WebSocket closed');
      this.actions.closed()
    };
    this.ws.onmessage = (e) => {
      try {
        var msg = JSON.parse(e.data);
        this.actions.messageReceived(this.id, msg)
      } catch(e) {
        log.error('Got bad data from WebSocket', e);
        this.ws.close()
      }
    };
  }
  stopWebSocket() {
    if(this.ws) {
      this.ws.close();
    }
  }
}

export default WebSocketService
