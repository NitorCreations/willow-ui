import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConfigurationDisplay } from 'components';
import './Radiator.scss';

class HorizonGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.config.uid()}</div>
  }
}

function resolveGraph(config) {
    switch(config.graph_type()) {
      case "horizon":
        return <HorizonGraph key={config.uid()} config={config} />
      default:
        return <div>can't resolve graph type: {config.graph_type()}</div>
    }
}

class Radiator extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var config = this.props.radiatorConfiguration;
    return (
      <div>
        <div className="debug">
          <h1>DEBUG: RADIATOR PANEL: {this.props.radiatorId}</h1>
          <ConfigurationDisplay radiatorId={this.props.radiatorId} />
        </div>

        <div className="graphs">
          <h1>{config.title()}</h1>
          <p>{config.description()}</p>
          {config.graphs().map(graph => {
            return resolveGraph(graph)
          })}
        </div>
      </div>
    );
  }
}

export default connect((state, configurations) => {
  return {
    radiatorId: configurations.params.radiatorId,
    radiatorConfiguration: state.get('configurations').radiator(configurations.params.radiatorId) };
}) (Radiator);
