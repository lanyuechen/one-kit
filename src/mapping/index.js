import React, { Component } from 'react';
import Mapping from './mapping';
import './styles.scss';

import Model from '../mapping/model';

export default class extends Component {
  constructor(props) {
    super(props);

    const { geoUrl, width, height, tris, data } = props;
    this.state = {
      mappingVisible: true,
      resultVisible: false,
      result: { tris, data }
    };

    this.loadMap(geoUrl, (geo) => {
      this.geo = geo;
      this.mapping = new Mapping({
        container: this.refs.svg,
        width,
        height,
        geo,
        tris,
        data,
        onUpdate: this.handleUpdate
      });
      this.forceUpdate();
    });
    this.model = new Model({tris, data});
    this.addEventListener();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  addEventListener() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 72) {     //h
      this.setState({
        mappingVisible: !this.state.mappingVisible
      })
    }
    if (e.keyCode === 32) {     //空格
      this.setState({
        resultVisible: !this.state.resultVisible
      })
    }
  };

  handleUpdate = () => {
    this.setState({
      result: this.mapping.result()
    }, () => {
      this.model = new Model(this.state.result);
    });
  };

  loadMap(geoUrl, cb) {
    d3.json(geoUrl, (err, geo) => {
      if (err) {
        console.error(err);
        return;
      }
      cb(geo);
    });
  }

  render() {
    const { width, height, img } = this.props;
    const { mappingVisible, resultVisible, result } = this.state;

    return (
      <div className="mapping" style={{width, height}} onContextMenu={e => e.preventDefault()}>
        <div className="board test-board" style={{background: `url(${img})`}}>
          {this.model && this.geo && this.geo.features.map(d => {
            const [ left, top ] = this.model.toXY(d.properties.cp);
            return (
              <div
                key={d.properties.name}
                className="test-dot"
                style={{left, top}}
              >
                {d.properties.name}
              </div>
            );
          })}
        </div>
        <svg
          ref="svg"
          className="board mapping-board"
          style={{display: mappingVisible ? 'block' : 'none'}}
        >

        </svg>
        <div
          className="board result-board"
          style={{display: resultVisible ? 'block' : 'none'}}
        >
          <pre>{JSON.stringify(result, undefined, 2)}</pre>
        </div>
      </div>
    );
  }
}