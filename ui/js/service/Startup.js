import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/counters';

export default function startup(dispatch) {
    const actions = bindActionCreators(actionCreators, dispatch);
    setInterval(() => {
        console.log('Incrementing Foobar counter in background')
        actions.increment('Foobar counter')
    }, 3000)
}
