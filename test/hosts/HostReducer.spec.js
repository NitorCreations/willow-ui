import {List, fromJS} from 'immutable';
import {expect} from 'chai';

import {setHosts} from '../../ui/js/hosts/HostActions';
import {hosts as reducer} from '../../ui/js/hosts/HostReducer';

describe('HostReducer', () => {

  it('sets hosts on HOSTS_SET', () => {
    const initialState = List([]);
    const nextState = reducer(initialState, setHosts(['host_foo', 'host_bar']));

    expect(nextState).to.equal(fromJS(['host_foo', 'host_bar']));
  });

});