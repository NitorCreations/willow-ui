import Serializable from './Serializable';
import Radiator from './Radiator';

class ClientConfiguration extends Serializable {

  constructor(data) {
    super(data);
    this._data = this._data.updateIn(['radiators'], radiators => {
      return radiators.map(radiator => {
        return new Radiator(radiator);
      });
    });
  }

  radiators() {
    return this._data.get('radiators').valueSeq();
  }

  radiator(id) {
    return this._data.getIn(['radiators',id])
  }
}

export default ClientConfiguration;
