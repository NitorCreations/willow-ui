export function connecting(url) {
  return {
    type: 'WEBSOCKET_CONNECTING',
    payload: {
      url,
    }
  };
}

export function closed() {
  return {
    type: 'WEBSOCKET_CLOSED',
  };
}

export function opened() {
  return {
    type: 'WEBSOCKET_OPENED',
  };
}

export function error() {
  return {
    type: 'WEBSOCKET_ERROR',
  };
}

export function messageReceived(msg) {
  return {
    type: 'WEBSOCKET_MESSAGE',
    payload: msg
  };
}
