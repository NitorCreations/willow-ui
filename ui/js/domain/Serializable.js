import Immutable from 'immutable';

class Serializable {

  constructor(data) {
    this._data = Immutable.fromJS(data);
  }

  toJSON() {
    return this._data.toJSON();
  }
}

export default Serializable;
