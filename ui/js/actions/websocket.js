export function createWebsocket(instance) {
  return {
    type: 'WEBSOCKET_CREATED',
    payload: { instance, }
  };
}

export function connecting(instance) {
  return {
    type: 'WEBSOCKET_CONNECTING',
    payload: { instance, }
  };
}

export function closed(instance) {
  return {
    type: 'WEBSOCKET_CLOSED',
    payload: { instance, }
  };
}

export function opened(instance) {
  return {
    type: 'WEBSOCKET_OPENED',
    payload: { instance, }
  };
}

export function error(instance) {
  return {
    type: 'WEBSOCKET_ERROR',
    payload: { instance, }
  };
}
