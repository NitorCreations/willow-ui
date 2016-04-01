import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ShellTerminal } from 'components';
import './Shell.scss';

function terminalConfigurations(newUser, newHost) {
  return {
    user: newUser,
    host: newHost,
    rows: 30,
    maxCols: 120
  };
}

class Shell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      terminals: [],
      newUser: '@admin',
      newHost: 'hostname'
    };
  }

  render() {
    var terminals = this.state.terminals;
    return (
      <div className="shell-container">
        <header>
          <p1>Shells</p1>
          <form>
            <input type="text" name="username" value={this.state.newUser} onChange={this.updateUserName.bind(this)} />
            <input type="text" name="host" value={this.state.newHost} onChange={this.updateHost.bind(this)} />
            <button onClick={this.handleSubmit.bind(this)}>"create"</button>
          </form>
        </header>
        {terminals.map(terminalConfig => {
          return (<ShellTerminal {...terminalConfig} />);
        })}
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      terminals: this.state.terminals.concat(terminalConfigurations(this.state.newUser, this.state.newHost))
    });
  }

  updateUserName(event) {
    this.setState({
      newUser: event.target.value
    });
  }

  updateHost(event) {
    this.setState({
      newHost: event.target.value
    });
  }
}

export default connect(() => {
  return {};
}) (Shell);
