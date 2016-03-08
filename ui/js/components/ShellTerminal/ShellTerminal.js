import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Terminal from 'term.js';

import ReduxWebSocketService from 'websocket/ReduxWebSocketService';
import createUuid from 'util/uuid';

const TerminalStates = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSED: 3,
  ERROR: 4
};

const StatusToClass = {
  0: "connecting",
  1: "open",
  3: "closed",
  4: "error"
};

const StatusToDescription = {
  0: "Connecting to server...",
  1: "Connection open",
  3: "Connection closed",
  4: "Connection ERROR"
};

const HEARTBEAT_IN_MILLIS = 5000;

function resolveWebsocketUri(user, host, nCols, nRows) {
  var location = window.location;
  var ws_protocol = resolveProtocol(location);
  var ws_host = resolveHost(location);
  var ws_context = resolveContext(location);

  return `${ws_protocol}//${ws_host}${ws_context}/rawterminal/?user=${user}&host=${host}&cols=${nCols}&rows=${nRows}`;

  function resolveProtocol(location) {
    return location.protocol === "https:" ? "wss:" : "ws:";
  }

  function resolveHost(location) {
    return location.host;
  }

  function resolveContext(location) {
    return location.pathname.replace(/ui.*$/, "").substring(1);
  }
}

class ShellTerminal extends Component {

  constructor(props) {
    super(props);

    var rowsAndCols = { rows: this.props.rows, cols: this.props.maxCols };
    var webSocketId = 'host_' + this.props.host;
    var webSocketUri = resolveWebsocketUri(this.props.user, this.props.host, rowsAndCols.cols, rowsAndCols.rows);

    var term = new Terminal({
      cols: rowsAndCols.cols,
      rows: rowsAndCols.rows,
      screenKeys: true,
      cursorBlink: true,
      useStyles: true
    });

    term.on('title', title => {
      document.title = title;
    });

    var socket = new ReduxWebSocketService(webSocketUri, webSocketId, this.props.dispatch)
      .withRawData()
      .onOpened( () => {
        this.setState({ connectionStatus: TerminalStates.OPEN })
      })
      .onMsg(data => {
        term.write(data.msg)
      })
      .onError(() => {
        this.setState({ connectionStatus: TerminalStates.ERROR })
      })
      .onClose(() => {
        this.setState({ connectionStatus: TerminalStates.CLOSED });
        term.destroy()
      })
      .open();

    term.on('data', data => {
      socket.send(data);
    });

    window.setInterval(function() {
      socket.send(JSON.stringify({ ping: 1 }));
    }, HEARTBEAT_IN_MILLIS);

    this.state = {
      uuid: createUuid(),
      socket: socket,
      terminal: term,
      connectionStatus: TerminalStates.CONNECTING,
      webSocketId: webSocketId,
      ...rowsAndCols
    };
  }

  render() {
    return (
      <div className="shell-terminal">
        <header className={StatusToClass[this.state.connectionStatus]}>
          <div>ID: {this.state.webSocketId}</div>
          <div>{StatusToDescription[this.state.connectionStatus]}</div>
        </header>
        <div className="terminal-content">
          <div className="ruler">1</div>
          <div id={this.state.uuid} className="terminal-container"></div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.state.terminal.open(document.getElementById(this.state.uuid));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    var rowsAndCols = this.calculateOptimalRowsAndCols();
    this.state.terminal.resize(rowsAndCols.cols, rowsAndCols.rows);
    this.state.socket.send(JSON.stringify(rowsAndCols));
    this.setState({
      ...rowsAndCols
    });
  }

  calculateOptimalRowsAndCols() {
    var rootElement = ReactDOM.findDOMNode(this);
    var terminalElement = rootElement.getElementsByClassName('terminal-container')[0];
    var rulerElement = rootElement.getElementsByClassName('ruler')[0];

    var characterWidth = rulerElement.clientWidth;
    var width = terminalElement.clientWidth;
    var nCols = Math.min(parseInt(width / characterWidth), this.props.maxCols);
    return {cols: nCols, rows: this.props.rows };
  }
}

export default connect( (state, componentProperties) => {
  return {
    componentProperties,
  }
}) (ShellTerminal);
