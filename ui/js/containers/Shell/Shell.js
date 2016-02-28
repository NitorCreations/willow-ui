import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ShellTerminal } from 'components';
import './Shell.scss';

function resolveWebsocketUri(nCols, nRows) {
  var loc = window.location, ws_uri;
  if (loc.protocol === "https:") {
    ws_uri = "wss:";
  } else {
    ws_uri = "ws:";
  }
  var ctx = "/";
  var ctxEnd = loc.pathname.lastIndexOf("/");
  if (ctxEnd > 0) {
    if (loc.pathname.indexOf("/") === 0) {
      ctx = "";
    }
    ctx += loc.pathname.substring(0, ctxEnd) + "/";
  }
  ws_uri += "//" + loc.host + ctx + "rawterminal/" + loc.search + "&cols=" + nCols + "&rows=" + nRows;
  ws_uri = "ws://localhost:5120/rawterminal/?user=@admin&host=draco&cols=105&rows=71";
  return ws_uri;
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
    var terminalWebSocketUri = resolveWebsocketUri(rowsAndCols.cols, rowsAndCols.rows);

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

export default connect(state => {
  return {}
}) (Shell);
