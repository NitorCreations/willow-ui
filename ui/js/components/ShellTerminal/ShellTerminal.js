import React, { Component, PropTypes } from 'react';
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
  0: "connecting",
  1: "open",
  3: "closed",
  4: "error"
};

const HEARTBEAT_IN_MILLIS = 5000;

function calculateOptimalRowsAndCols() {
  var fontSize = 12; //this value should match font-size defined in Shell.scss
  var characterWidth = fontSize;
  var characterHeight = fontSize;

  var nCols = parseInt(window.innerWidth / characterWidth) - 5;
  var nRows = parseInt(window.innerHeight / characterHeight) - 5;
  return {cols: nCols, rows: nRows};
}

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

    var rowsAndCols = calculateOptimalRowsAndCols();
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

    //FIXME react to window change, commented code doesn't work...
    //$(window).resize(() => {
    //  var rowsAndCols = calculateOptimalRowsAndCols();
    //  term.resize(rowsAndCols.cols, rowsAndCols.rows);
    //  socket.send(JSON.stringify(rowsAndCols));
    //});

    this.state = {
      terminal: term,
      uuid: createUuid(),
      connectionStatus: TerminalStates.CONNECTING,
      webSocketId: webSocketId
    };
  }

  render() {
    return (
      <div>
        <h2>Terminal for "{this.state.webSocketId}"</h2>
        <div className={StatusToClass[this.state.connectionStatus]}>Connection status: {StatusToDescription[this.state.connectionStatus]}</div>
        <div id={this.state.uuid} ></div>
      </div>
    );
  }

  componentDidMount() {
    this.state.terminal.open(document.getElementById(this.state.uuid));
  }
}

export default connect( (state, componentProperties) => {
  return {
    componentProperties,
  }
}) (ShellTerminal);
