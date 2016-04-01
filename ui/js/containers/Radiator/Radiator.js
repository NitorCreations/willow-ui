import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConfigurationDisplay } from 'components';

class Radiator extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p1>RADIATOR PANEL: {this.props.radiatorId}</p1>
        <ConfigurationDisplay radiatorId={this.props.radiatorId} />
      </div>
    );
  }
}

export default connect((state, configurations) => {
  return {
    radiatorId: configurations.params.radiatorId,
    radiatorConfiguration: state.get('configurations').radiator(configurations.radiatorId) };
}) (Radiator);
