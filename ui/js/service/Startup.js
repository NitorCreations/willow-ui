import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/counters';
import WebSocketService from '../websocket/WebSocketService'

export default function startup(dispatch) {
    const actions = bindActionCreators(actionCreators, dispatch);

    const url = 'ws://localhost:5120/poll/'
    const websocket = new WebSocketService(dispatch, url, 'poller');
    websocket.startWebSocket()

}
