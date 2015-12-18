import { bindActionCreators } from 'redux';
import ReduxWebSocketService from '../websocket/ReduxWebSocketService'
import { setHosts } from '../hosts/HostActions';
import createUuid from '../util/uuid';
const url = 'ws://localhost:5120/poll/';

export default function startup(dispatch) {
    new ReduxWebSocketService(url, 'hosts', dispatch)
        .send({
          id: createUuid(),
          metricKey: '/hosts',
          start: new Date(new Date - 3*3600*1000).getTime(),
          step: 10000,
          minSteps: 10,
          tags: []
        })
        .onMsgDispatch(msg => setHosts(msg.data))
        .open();
}
