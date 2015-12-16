import * as log from '../util/log'
import createUuid from '../util/uuid'
import {noop} from '../util/util';
import {createWebSocket} from './WebSocketProvider'
/**
 * Handles the creation, closing, and message traffic for web sockets.
 */
class WebSocketService {

  /**
   * Create a new web socket service. Call {@link WebSocketService#open} to open the web socket
   * @param name a human-readable name of the socket
   * @param url the url endpoint
   * @param onMsg
   * @param onOpened called with {ws, id, name} when the web socket is opened
   * @param onError called with {ws, id, name, error} when the web socket receives an error
   * @param onClose called with {ws, id, name} when the web socket is closed
   * @param onStart called with {ws, id, name} when the web socket is started
   */
  constructor({name, url, onOpened=noop, onMsg=noop, onError=noop, onClose=noop, onStart=noop}) {
    var uuid = createUuid();
    this.id = uuid;
    this.name = name || `socket ${this.id}`;
    this.url = url;
    this.onClose = onClose;
    this.onError = onError;
    this.onMsg = onMsg;
    this.onOpened = onOpened;
    this.onStart = onStart;
  }

  /**
   * Open the web socket and bind event handlers
   * @returns {WebSocketService} this for chaining
   */
  open() {
    this.ws = createWebSocket(this.url);
    this.onStart(this.id);

    this.ws.onopen = () => {
      log.info('WebSocket opened to ', this.url);
      this.onOpened({ws: this.ws, id: this.id, name: this.name});
    };
    this.ws.onerror = (e) => {
      log.error('WebSocket error', e);
      this.onError({ws: this.ws, id: this.id, name: this.name, error: e});
    };
    this.ws.onclose = () => {
      log.info('WebSocket closed');
      this.onClose({ws: this.ws, id: this.id, name: this.name});
    };

    this.ws.onmessage = (e) => {
      try {
        var msg = JSON.parse(e.data);
        this.onMsg({msg, id: this.id});
      } catch(e) {
        log.error('Got bad data from WebSocket', e);
        this.ws.close();
      }
    };
    return this;
  }

  /**
   * Close the web socket
   */
  close() {
    if(this.ws) {
      this.ws.close();
    }
  }
}

export default WebSocketService
