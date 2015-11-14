import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'actions/counters';

@connect(state => state.counters)
export default class CounterButton extends Component {
    constructor(props) {
        super(props);
        this.actions = bindActionCreators(actionCreators, this.props.dispatch);
    }

    render() {
        return (
            <button>{this.props.name} {this.props.counters[this.props.name] || 0}</button>
        )
    }
}
