import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Terminal from 'term.js';
import './Shell.scss';

import ReduxWebSocketService from 'websocket/ReduxWebSocketService';
import createUuid from 'util/uuid';

//FIXME sami-airaksinen 11/27/15 : responsiveness
/*
 $(window).resize(debouncer(function (e) {
 var nCols = parseInt(20 * $(window).width() / "0123456789ABCDEFGHIJK".width() + 1);
 var nRows = parseInt($(window).height() / "0123456789ABCDEFGHIJK".height() - 1);
 window.term.resize(nCols, nRows);
 window.socket.send("{\"cols\":" + nCols + ",\"rows\":" + nRows + "}");
 }));
 */

class ShellTerminal extends Component {

  constructor(props) {
    super(props);

    var term = new Terminal({
      cols: this.props.cols,
      rows: this.props.rows,
      screenKeys: true,
      cursorBlink: true,
      useStyles: true
    });

    term.on('title', title => {
      document.title = title;
    });

    var socket = new ReduxWebSocketService(this.props.uri, this.props.webSocketId, this.props.dispatch)
      .withRawData()
      .onMsg(data => {
        term.write(data.msg)
      })
      .onClose(() => {
        term.destroy()
      })
      .open();

    term.on('data', data => {
      socket.send(data);
    });

    this.state = { terminal: term, uuid: createUuid() };
  }

  render() {
    return (
      <div id={this.state.uuid} ></div>
    );
  }

  componentDidMount() {
    this.state.terminal.open(document.getElementById(this.state.uuid));

    /*//fixme do it better
     window.setInterval(function() {
     this.props.socket.send(JSON.stringify({ ping: 1 }));
     }, 2000);*/
  }
}

const ShellTerminalConnect = connect( (state, componentProperties) => {
  return {
    componentProperties,
  }
}) (ShellTerminal);

class Shell extends Component {

  constructor(props) {
    super(props);
    var webSocketId = 'host_draco';

    var fontSize = 12; //this value should match font-size defined in Shell.scss
    var characterWidth = fontSize;
    var characterHeight = fontSize;

    var nCols = parseInt(window.innerWidth / characterWidth) - 5;
    var nRows = parseInt(window.innerHeight / characterHeight) -5;
    var terminalWebSocketUri = resolveWebsocketUri(nCols, nRows);

    this.state = {
      webSocketId: webSocketId,
      uri: terminalWebSocketUri,
      nCols: nCols,
      nRows: nRows
    };
  }

  render() {
    var componentConfiguration = {
      cols: this.state.nCols,
      rows: this.state.nRows,
      webSocketId: this.state.webSocketId,
      uri: this.state.uri
    };

    return (
      <div>
        <h2>terminal: {this.state.webSocketId}</h2>
        <ShellTerminalConnect {...componentConfiguration} />
      </div>
    )
  }
}

export default connect(state => {
  return {}
}) (Shell);

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
