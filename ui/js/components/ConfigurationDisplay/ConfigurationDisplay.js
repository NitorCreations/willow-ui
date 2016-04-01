import React from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';

function GraphView(graph) {
  return (<li key={graph.uid()}>
    <p>{graph.uid()}</p>
    <p>graph-type: {graph.graph_type()}</p>
    <p>configuration: {graph.configuration()}</p>
    <ul>
      {graph.metrics().map(m => {
        return (<li key={m.instance_tag()}>
          { m.instance_tag() } : { m.metric_key() }
        </li>);
      })}
    </ul>
  </li>);
}

function radiatorConfigurationView(radiator) {
  return (<li key={radiator.title()}>
    <p>{radiator.title()}</p>
    <p>{radiator.description()}</p>
    <p>Graphs in radiator</p>
    <ul>{radiator.graphs().map(graph => {
      return GraphView(graph);
    })}</ul>
  </li>);
}

class ConfigurationDisplay extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return radiatorConfigurationView(this.props.radiatorConfiguration);
  }
}

export default connect( (state, configuration) => {
  return { radiatorConfiguration: state.get('configurations').radiator(configuration.radiatorId) };
} ) (ConfigurationDisplay);
