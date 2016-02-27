import * as log from '../util/log';
import createUuid from '../util/uuid';
import {createWebSocket} from './WebSocketProvider';
import {WebSocketStates} from './constants';
/**
 * Handles the creation, closing, and message traffic for web sockets.
 *
 * Example:
 * <pre>
 *    new WebSocketService('ws://...', 'test-ws')
 *      .onOpened(({ws}) => ws.send(JSON.stringify({ my: 'data' })))
 *      .onMsg(({name, msg}) => console.log(`Got message from ${name}: ${msg}`))
 * </pre>
 */
class WebSocketService {

  /**
   * Create a new web socket service. Call {@link WebSocketService#open} to open the web socket
   * @param name a human-readable name of the socket
   * @param url the url endpoint
   */
  constructor(url, name) {
    this.id = createUuid();
    this.name = name || `socket ${this.id}`;
    this.url = url;

    this._onClose = [];
    this._onError = [];
    this._onMsg = [];
    this._onOpened = [];
    this._onStart = [];

    this._queue = [];
    this.onOpened(() => this._queue.forEach(msg => this.send(msg)));
  }

  /**
   * Add an onClose callback to the web socket. The function will be called
   * with {id, name, ws}
   * @param {Function} fn the callback
   * @return {WebSocketService} this for chaining
   */
  onClose(fn) {
    this._onClose.push(fn);
    return this;
  }

  /**
   * Add a callback to the opened event. The function will be called
   * with {id, name, ws}
   * @param {Function} fn the callback
   * @return {WebSocketService} this for chaining
   */
  onOpened(fn) {
    this._onOpened.push(fn);
    return this;
  }

  /**
   * Add a callback for messages. The function will be called
   * with {id, name, msg}
   * @param {Function} fn the callback
   * @return {WebSocketService} this for chaining
   */
  onMsg(fn) {
    this._onMsg.push(fn);
    return this;
  }

  /**
   * Add a callback for errors. The function will be called
   * with {id, name, error}
   * @param {Function} fn the callback
   * @return {WebSocketService} this for chaining
   */
  onError(fn) {
    this._onError.push(fn);
    return this;
  }

  /**
   * Add a callback for the start event, before the web socket is opened. The function will be called
   * with {id, name, ws}
   * @param {Function} fn the callback
   * @return {WebSocketService} this for chaining
   */
  onStart(fn) {
    this._onStart.push(fn);
    return this;
  }

  /**
   * Default method for deserialize data into websocket channel.
   * @param data message that client sends to websocket.
   * @return deserialized data
   */
  deSerializeData(data) {
    return JSON.parse(data);
  }

  /**
   * Default method for serialize data from websocket channel.
   * @param data message which client receives.
   * @return serialized data
   */
  serializeData(data) {
    return JSON.stringify(data);
  }

  /**
   * Open the web socket and bind event handlers
   * @returns {WebSocketService} this for chaining
   */
  open() {
    this._ws = createWebSocket(this.url);
    this._onStart.forEach(fn => fn({ws: this._ws, id: this.id, name: this.name}));

    this._ws.onopen = () => {
      log.info(`WebSocket ${this.name} opened to ${this.url}`);
      this._onOpened.forEach(fn => fn({ws: this._ws, id: this.id, name: this.name}));
    };
    this._ws.onerror = (e) => {
      log.error(`WebSocket ${this.name} error`, e);
      this._onError.forEach(fn => fn({ws: this._ws, id: this.id, name: this.name, error: e}));
    };
    this._ws.onclose = () => {
      log.info(`WebSocket ${this.name} closed`);
      this._onClose.forEach(fn => fn({ws: this._ws, id: this.id, name: this.name}));
    };

    this._ws.onmessage = (e) => {
      try {
        var msg = this.deSerializeData(e.data);
        this._onMsg.forEach(fn => fn({ws: this._ws, id: this.id, name: this.name, msg}));
      } catch(err) {
        log.error('Got bad data from WebSocket', err);
        this._ws.close();
      }
    };
    return this;
  }

  /**
   * Converts the message object to a JSON string and sends it through the web socket.
   * Note: will queue the message if the web socket is not yet open. Therefore, it is safe
   * to call this method even if the socket is still connecting.
   *
   * @param msg the message to send
   * @return {WebSocketService} this for chaining
   */
  send(msg) {
    if (this._ws && this._ws.readyState === WebSocketStates.OPEN) {
      this._ws.send(this.serializeData(msg));
    } else {
      this._queue.push(msg);
    }
    return this;
  }

  /**
   * Close the web socket
   */
  close() {
    if(this._ws) {
      this._ws.close();
    }
  }
}

export default WebSocketService;
