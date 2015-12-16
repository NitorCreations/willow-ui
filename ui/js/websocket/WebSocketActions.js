export const WebSocketActions = {
  WEBSOCKET_CREATED: 'WEBSOCKET_CREATED',
  WEBSOCKET_CONNECTING: 'WEBSOCKET_CONNECTING',
  WEBSOCKET_CLOSED: 'WEBSOCKET_CLOSED',
  WEBSOCKET_OPENED: 'WEBSOCKET_OPENED',
  WEBSOCKET_ERROR: 'WEBSOCKET_ERROR'
};

export function createWebsocket(instance) {
  return {
    type: WebSocketActions.WEBSOCKET_CREATED,
    payload: { instance, }
  };
}

export function connecting(instance) {
  return {
    type: WebSocketActions.WEBSOCKET_CONNECTING,
    payload: { instance, }
  };
}

export function closed(instance) {
  return {
    type: WebSocketActions.WEBSOCKET_CLOSED,
    payload: { instance, }
  };
}

export function opened(instance) {
  return {
    type: WebSocketActions.WEBSOCKET_OPENED,
    payload: { instance, }
  };
}

export function error(instance) {
  return {
    type: WebSocketActions.WEBSOCKET_ERROR,
    payload: { instance, }
  };
}
