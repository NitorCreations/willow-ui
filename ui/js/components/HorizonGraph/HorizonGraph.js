import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConfigurationDisplay } from 'components';
import './HorizonGraph.scss';

class HorizonGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.config.uid()}</div>
  }
}

export default connect((state, configurations) => {
  return {
    config: configurations.config
  };
}) (HorizonGraph);
