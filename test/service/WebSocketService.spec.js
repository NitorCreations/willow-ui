import {expect} from 'chai';
import * as sinon from 'sinon';
import WebSocketService from '../../ui/js/service/WebSocketService';
import {noop} from '../../ui/js/util/util';

import {MockLog, WebSocketMock} from '../mocks';

describe('WebSocketService', () => {
  var service, ws;

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

  describe('when created with minimal params', () => {
    beforeEach(() => {
      service = new WebSocketService({url: 'url'});
    });
    it('should set the callbacks to noop', () => {
      expect(service.onClose).to.equal(noop);
      expect(service.onError).to.equal(noop);
      expect(service.onMsg).to.equal(noop);
      expect(service.onOpened).to.equal(noop);
      expect(service.onStart).to.equal(noop);
    });

    it('should set name, url, and uuid', () => {
      expect(service.id).to.be.ok;
      expect(service.name).to.equal('socket ' + service.id);
      expect(service.url).to.equal('url');
    });
  });

  describe('when creating normally', () => {
    var url = 'ws://localhost:12345';
    var onClose, onError, onMsg, onOpened, onStart;
    beforeEach(() => {
      onClose = sinon.stub();
      onError = sinon.stub();
      onMsg = sinon.stub();
      onOpened = sinon.stub();
      onStart = sinon.stub();
      service = new WebSocketService({
        name: 'test-ws',
        url,
        onClose,
        onError,
        onMsg,
        onOpened,
        onStart
      });
    });

    it('should have set the callbacks to params', () => {
      expect(service.onClose).to.equal(onClose);
      expect(service.onError).to.equal(onError);
      expect(service.onMsg).to.equal(onMsg);
      expect(service.onOpened).to.equal(onOpened);
      expect(service.onStart).to.equal(onStart);
    });

    describe('after #open is called', () => {
      beforeEach(() => service.open());
      it('should call onStart', () => {
        expect(onStart).to.have.been.called;
      });
      it('should pass the url to the web socket', () => {
        expect(ws.url).to.equal('ws://localhost:12345');
      });

      describe('when opened', () => {
        beforeEach(() => ws.t_open());
        it('should call onOpened', () => {
           expect(onOpened).to.have.been.calledWith({
             id: service.id,
             name: service.name,
             ws
           });
        });
      });

      describe('when receiving error', () => {
        var err = {error:'error'};
        beforeEach(() => ws.t_error(err));
        it('should call onOpened', () => {
          expect(onError).to.have.been.calledWith({
            id: service.id,
            name: service.name,
            error: err,
            ws
          });
        });
      });

      describe('when closed', () => {
        beforeEach(() => ws.t_close());
        it('should call onClose', () => {
          expect(onClose).to.have.been.calledWith({
            id: service.id,
            name: service.name,
            ws
          });
        });
      });

      describe('when receiving message', () => {
        var msg;
        beforeEach(() => {
          msg = {well: 'Hello there'};
          ws.t_msg({
            data: JSON.stringify(msg)
          });
        });

        it('should parse the json and call onMsg', () => {
          expect(onMsg).to.have.been.calledWith({msg: msg, id: service.id});
        });
      });

    });

  });

});
