import * as sinon from 'sinon';
import {WebSocketStates} from '../ui/js/websocket/constants';

export class MockLog {
  debug() {}
  error() {}
  info() {}
  warn() {}
  log() {}
}

export class WebSocketMock {
  constructor(url) {
    this.url = url;
    this.send = sinon.stub();
    this.readyState = WebSocketStates.CONNECTING;
  }

  t_msg(msg) { this.onmessage(msg); }
  t_error(err) { this.onerror(err); }
  t_close() {
    this.readyState = WebSocketStates.CLOSED;
    this.onclose();
  }
  t_open() {
    this.readyState = WebSocketStates.OPEN;
    this.onopen();
  }
}