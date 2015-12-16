import {expect} from 'chai';
import * as sinon from 'sinon';
import WebSocketService from '../../ui/js/websocket/WebSocketService';
import ReduxWebSocketService from '../../ui/js/websocket/ReduxWebSocketService';
import {noop} from '../../ui/js/util/util';
import {createStore} from 'redux';

import {MockLog, WebSocketMock} from '../mocks';

describe('WebSocketService', () => {
  var service, ws, store;

  beforeEach(() => {
    WebSocketService.__Rewire__('log', new MockLog());
    WebSocketService.__Rewire__('createWebSocket', url => {
      ws = new WebSocketMock(url);
      return ws;
    });
  });
  afterEach(() => {
    WebSocketService.__ResetDependency__('createWebSocket');
    WebSocketService.__ResetDependency__('log');
  });

  function events(state = [], action) {
    if (action.type.indexOf('WEBSOCKET_') !== -1) {
      state.push(action.type);
    }
    return state;
  }

  beforeEach(() => {
    store = createStore(events);
    service = new ReduxWebSocketService('url', 'test-ws', store.dispatch);
  });

  describe('when calling open()', () => {
    beforeEach(() => service.open());

    it('should dispatch WEBSOCKET_CREATED and WEBSOCKET_CONNECTING', () => {
      expect(store.getState()).to.deep.equal(['WEBSOCKET_CREATED', 'WEBSOCKET_CONNECTING']);
    });

    describe('and then opened', () => {
      beforeEach(() => ws.t_open());
      it('should dispatch WEBSOCKET_OPENED', () => {
        expect(store.getState()).to.contain('WEBSOCKET_OPENED');
      });
    });

    describe('and then errored', () => {
      beforeEach(() => ws.t_error());
      it('should dispatch WEBSOCKET_ERROR', () => {
        expect(store.getState()).to.contain('WEBSOCKET_ERROR');
      });
    });

    describe('and then closed', () => {
      beforeEach(() => ws.t_close());
      it('should dispatch WEBSOCKET_CLOSED', () => {
        expect(store.getState()).to.include('WEBSOCKET_CLOSED');
      });
    });
  });

});