export function createWebsocket(instance) {
  return {
    type: 'WEBSOCKET_CREATED',
    payload: { instance, }
  };
}

export function connecting(id) {
  return {
    type: 'WEBSOCKET_CONNECTING',
    payload: { id, }
  };
}

export function closed(id) {
  return {
    type: 'WEBSOCKET_CLOSED',
    payload: { id, }
  };
}

export function opened(websocket, id) {
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
    payload: { id, }
  };
}

export function error(id) {
  return {
    type: 'WEBSOCKET_ERROR',
    payload: { id, }
  };
}

export function messageReceived(id, msg) {
  return {
    type: 'WEBSOCKET_MESSAGE',
    payload: { msg, id, }
  };
}
