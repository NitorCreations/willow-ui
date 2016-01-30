import Serializable from './Serializable';

class Metric extends Serializable {

  constructor(data) {
    super(data);
  }

  instance_tag() {
    return this._data.get('instance_tag');

  }
  metric_key() {
    return this._data.get('metric_key');
  }
}

export default Metric;
