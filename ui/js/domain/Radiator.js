import Serializable from './Serializable';
import Graph from './Graph';

class Radiator extends Serializable {

  constructor(data) {
    super(data);
    this._data = this._data.updateIn(['graphs'], graphs => {
      return graphs.map(graph => {
        return new Graph(graph)
      })
    })
  }

  title() {
    return this._data.get('title');
  }

  description() {
    return this._data.get('description');
  }

  graphs() {
    return this._data.get('graphs');
  }
}

export default Radiator;
