import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import createUuid from '../../ui/js/util/uuid';
import {createWebsocket, opened, connecting, error, closed} from '../../ui/js/websocket/WebSocketActions';
import * as WebSocketReducer from '../../ui/js/websocket/WebSocketReducer';
const reducer = WebSocketReducer.websockets;

import {MockLog} from '../mocks';

describe('WebSocketReducer', () => {
  const instance = { name: 'testWs', id: createUuid() };
  const createdState = fromJS({
    testWs: {
      instance: instance,
      state: 'created'
    }
  });

  beforeEach(() => {
    WebSocketReducer.__Rewire__('log', new MockLog());
  });
  afterEach(() => {
    WebSocketReducer.__ResetDependency__('log');
  });

  it('adds web socket to state when created', () => {
    const nextState = reducer(Map({}), createWebsocket(instance));
    expect(nextState).to.equal(createdState);
  });

  it('sets status to connecting when connecting', () => {
    const nextState = reducer(createdState, connecting(instance));
    expect(nextState.getIn(['testWs','state'])).to.equal('connecting');
  });

  it('sets status to opened when opened', () => {
    const nextState = reducer(createdState, opened(instance));
    expect(nextState.getIn(['testWs','state'])).to.equal('open');
  });

  it('sets status to error on error', () => {
    const nextState = reducer(createdState, error(instance));
    expect(nextState.getIn(['testWs','state'])).to.equal('error');
  });

  it('removes from state when closed', () => {
    const nextState = reducer(createdState, closed(instance));
    expect(nextState.getIn(['testWs'])).to.be.undefined;
  });
});