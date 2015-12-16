import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class WebSocketStatus extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    var rows = [];
    this.props.websockets.forEach(ws => {
      var key = ws.getIn(['instance','id']);
      var name = ws.getIn(['instance','name']);
      var state = ws.get('state');
      rows.push(<li key={key}>
        <span>'{name}' state: <strong>{state}</strong></span>
      </li>);
    });

    return (<div name="websockets">
          <h3>Web sockets:</h3>
          <ul>{rows}</ul>
      </div>
    )
  }
}

export default connect( state => {
  return { websockets: state.get('websockets') }
} ) (WebSocketStatus)