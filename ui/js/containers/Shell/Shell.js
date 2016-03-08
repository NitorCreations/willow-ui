import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ShellTerminal } from 'components';
import './Shell.scss';

class Shell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '@admin',
      host: 'draco'
    };
  }

  render() {
    return (
      <div>
        <ShellTerminal {...this.state} />
      </div>
    )
  }
}

export default connect(() => {
  return {}
}) (Shell);
