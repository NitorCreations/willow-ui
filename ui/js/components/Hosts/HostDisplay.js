import React from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';

class HostDisplay extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    var rows = [];
    this.props.hosts.forEach(host => {
      rows.push(<li key={host}>{host}</li>);
    });

    return (<div name="hosts">
          <h3>Connected hosts:</h3>
          <ul>{rows}</ul>
        </div>
    )
  }
}

export default connect( state => {
  return { hosts: state.get('hosts') }
} ) (HostDisplay)