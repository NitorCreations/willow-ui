import Serializable from './Serializable';
import Metric from './Metric';

class Graph extends Serializable {

  constructor(data) {
    super(data);
    this._data = this._data.updateIn(['metrics'], metrics => {
      return metrics.map(metric => {
        return new Metric(metric);
      })
    })
  }

  uid() {
    return this._data.get('uid');
  }

  graph_type() {
    return this._data.get('graph_type');
  }

  configuration() {
    return this._data.get('configuration');
  }

  metrics() {
    return this._data.get('metrics');
  }
}

export default Graph;
