import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ShellTerminal } from 'components';
import './Shell.scss';

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

function calculateOptimalRowsAndCols() {
  var fontSize = 12; //this value should match font-size defined in Shell.scss
  var characterWidth = fontSize;
  var characterHeight = fontSize;

  var nCols = parseInt(window.innerWidth / characterWidth) - 5;
  var nRows = parseInt(window.innerHeight / characterHeight) - 5;
  return {cols: nCols, rows: nRows};
}

class Shell extends Component {

  constructor(props) {
    super(props);
    var webSocketId = 'host_draco';

    var rowsAndCols = calculateOptimalRowsAndCols();
    var terminalWebSocketUri = resolveWebsocketUri('@admin', 'draco', rowsAndCols.cols, rowsAndCols.rows);

    this.state = {
      webSocketId: webSocketId,
      uri: terminalWebSocketUri,
      rowsAndCols,
    };
  }

  render() {
    var componentConfiguration = {
      cols: this.state.rowsAndCols.cols,
      rows: this.state.rowsAndCols.rows,
      webSocketId: this.state.webSocketId,
      uri: this.state.uri
    };

    return (
      <div>
        <ShellTerminal {...componentConfiguration} />
      </div>
    )
  }
}

export default connect(() => {
  return {}
}) (Shell);
