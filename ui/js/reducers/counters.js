import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export function counters(state = initialState, action) {
  switch (action.type) {
  case 'INCREMENT':
    var counterName = action.payload.name;
    return state.updateIn([counterName], value => value ? ++value : 1);
  }
  return state;
}
