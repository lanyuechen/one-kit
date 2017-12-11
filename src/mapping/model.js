import Lazy from '../lib/lazy';
import Triangle from './triangle';

/**
 * tris: 三角数组 {id, points: [id1, id2, id3]}
 * data: 关联数组 {id, start: {x, y, lng, lat}, end: {x, y}, finished: true}
 */
class Model extends Lazy {
  constructor(props) {
    super(props);
    this.makeTris();
  }

  makeTris() {
    const dMap = this._data.reduce((p, n) => {
      p[n.id] = n;
      return p;
    }, {});

    this.triangles = this._tris.map(d => {
      const source = [], target = [];
      d.points.map(id => {
        const p = dMap[id];
        if (p) {
          source.push([p.start.lng, p.start.lat]);
          target.push([p.end.x, p.end.y]);
        }
      });
      return new Triangle(source, target);
    });
    return this;
  }

  toXY = ([lng, lat]) => {
    for (let t of this.triangles) {
      const d = t.parse([lng, lat]);
      if (d.in) {
        return d.result;
      }
    }
    return [0, 0];
  };

  getData(id) {
    return this._data.find(d => d.id === id);
  }

  appendData(data) {
    this._data.push(data);
  }

  updateData(id, data) {
    const idx = this._data.findIndex(d => d.id === id);
    if (idx > -1) {
      this._data[idx] = Object.assign(this._data[idx], data);
    }
  }

  removeData(id) {
    const idx = this._data.findIndex(d => d.id === id);
    if (idx > -1) {
      this._data.splice(idx, 1);
    }
  }

  getTris(id) {
    return this._tris.find(d => d.id === id);
  }

  appendTris(tri) {
    this._tris.push(tri);
  }

  updateTris(id, tri) {
    const idx = this._tris.findIndex(d => d.id === id);
    if (idx > -1) {
      this._tris[idx] = Object.assign(this._tris[idx], tri);
    }
  }

  removeTris(id) {
    const idx = this._tris.findIndex(d => d.id === id);
    if (idx > -1) {
      this._tris.splice(idx, 1);
    }
  }
}

export default Model;