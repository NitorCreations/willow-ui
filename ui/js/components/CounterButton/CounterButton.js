import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/counters';

// TODO decorators do not work
//@connect(state => state.counters)
//export default class CounterButton extends Component {

class CounterButton extends PureComponent {
    static propTypes = {
      name: React.PropTypes.string
    };
    constructor(props) {
      super(props);
      this.actions = bindActionCreators(actionCreators, this.props.dispatch);
    }

    _increment() {
      this.actions.increment(this.props.name);
    }

    render() {
      var counter = this.props.counters.get(this.props.name) || 0;
      return (
            <button onClick={() => this._increment()}>{this.props.name} {counter}</button>
        );
    }
}
// TODO workaround for decorators
export default connect( state => {
  return {counters: state.get('counters')};
} ) (CounterButton);
