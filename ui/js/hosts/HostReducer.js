import {List, fromJS} from 'immutable';
import {HostActions} from './HostActions';

const initialState = List([]);

export function hosts(state = initialState, action) {
  switch (action.type) {
    case HostActions.HOSTS_SET:
      return fromJS(action.payload.hosts);
  }
  return state;
}