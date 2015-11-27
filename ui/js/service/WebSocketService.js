import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/websocket';

class WebSocketService {
  constructor(dispatch, url) {
    this.url = url
    this.actions = bindActionCreators(actionCreators, dispatch);
    console.log(this.actions)
  }

  startWebSocket() {
    this.ws = new WebSocket(this.url)
    this.actions.connecting(this.url)
    this.ws.onopen = () => {
      console.info('WebSocket opened to ', this.url)
      this.actions.opened(this.ws)
    }
    this.onerror = (e) => {
      console.error('WebSocket error', e)
      this.actions.error()

    }
    this.onclose = (e) => {
      console.info('WebSocket closed')
      this.actions.closed()
    }
    this.ws.onmessage = (e) => {
      try {
        var msg = JSON.parse(e.data)
        this.actions.messageReceived(msg)
      } catch(e) {
        log.error('Got bad data from WebSocket', e)
        this.ws.close()
      }
    }
  }
  stopWebSocket() {
    if(this.ws) {
      this.ws.close()
    }
  }
}

export default WebSocketService