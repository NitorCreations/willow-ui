import { bindActionCreators } from 'redux';
import ReduxWebSocketService from '../websocket/ReduxWebSocketService';
import { setHosts } from '../hosts/HostActions';
import createUuid from '../util/uuid';
const authorizationUrl = 'http://localhost:5120/';
const websocketUrl = 'ws://localhost:5120/poll/';

export default function startup(dispatch) {

  function startWebsocket() {
    return new ReduxWebSocketService(websocketUrl, 'hosts', dispatch)
      .send({
        id: createUuid(),
        metricKey: '/hosts',
        start: new Date(new Date - 3 * 3600 * 1000).getTime(),
        step: 10000,
        minSteps: 10,
        tags: []
      })
      .onMsgDispatch(msg => setHosts(msg.data))
      .open();
  }

  fetch(authorizationUrl,
    {  mode: 'no-cors', credentials: 'include' })
    .then(startWebsocket);
}
