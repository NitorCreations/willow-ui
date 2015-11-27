import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/counters';
import WebSocketService from 'service/WebSocketService'

export default function startup(dispatch) {
    const actions = bindActionCreators(actionCreators, dispatch);
    /*
    setInterval(() => {
        console.log('Incrementing Foobar counter in background')
        actions.increment('Foobar counter')
    }, 3000)
    */
    const url = 'ws://localhost:5120/uiws/poll'
    const websocket = new WebSocketService(dispatch, url)
    websocket.startWebSocket()

}
