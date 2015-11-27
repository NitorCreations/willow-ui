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

export function opened(websocket) {
  websocket.send(JSON.stringify({
    id:"24ceec8d-ffd8-4263-8672-08b925d7a7df",
    metricKey:"/heap",
    start:1448619082719,
    //stop:1448629882719,
    step:10000,
    minSteps:10,

    tags:["host_vempele.local"]
  }))
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
