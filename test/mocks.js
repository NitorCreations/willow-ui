
export class MockLog {
  debug() {}
  error() {}
  info() {}
  warn() {}
  log() {}
}

export class WebSocketMock {
  constructor(url) {
    this.url = url;
  }
  t_msg(msg) { this.onmessage(msg); }
  t_error(err) { this.onerror(err); }
  t_close() { this.onclose(); }
  t_open() { this.onopen(); }
}