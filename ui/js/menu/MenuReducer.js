import Immutable from 'immutable';

import {MenuActions} from './MenuActions';

const initialState = Immutable.fromJS({open: false});

export function menus(state = initialState, action) {
  switch (action.type) {
    case MenuActions.OPEN:
      return state.updateIn(['open'], () => true);
    case MenuActions.CLOSE:
      return state.updateIn(['open'], () => false);
  }
  return state;
}
