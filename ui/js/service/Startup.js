import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/counters';
import * as wsActions from '../actions/websocket';
import WebSocketService from '../websocket/WebSocketService'

class ReduxWebSocketService extends WebSocketService {
    constructor(url, name, dispatch) {
        super(url, name);
        this.onStart(o => {
            dispatch(wsActions.createWebsocket(o))
            dispatch(wsActions.connecting(o))
        });
        this.onOpened(o => dispatch(wsActions.opened(o)));
        this.onClose(o => dispatch(wsActions.closed(o)));
        this.onError(o => dispatch(wsActions.error(o)));
    }
}

export default function startup(dispatch) {
    const actions = bindActionCreators(actionCreators, dispatch);

    const url = 'ws://localhost:5120/poll/'

    new ReduxWebSocketService(url, 'hosts', dispatch)
        .onOpened(({ws, id}) => {
            ws.send(JSON.stringify({
                id,
                metricKey: '/hosts',
                start: new Date(new Date - 3*3600*1000).getTime(),
                step: 10000,
                minSteps: 10,
                tags: []
            }));
        })
        .onMsg(({msg}) => {
            console.log('Got hosts: ', msg.data);
        })
        .open();

}
