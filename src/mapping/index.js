import React, { Component } from 'react';
import Mapping from './mapping';
import './styles.scss';

import Model from '../mapping/model';

const testData = [{"name":"山西省","cp":[112.918241,37.982155]},{"name":"辽宁省","cp":[122.824568,41.160445]},{"name":"上海市","cp":[121.106631,31.560443]},{"name":"湖北省","cp":[113.908013,30.64468]},{"name":"广东省","cp":[113.301588,22.79495]},{"name":"内蒙古自治区","cp":[111.703047,41.030061]},{"name":"江苏省","cp":[119.091659,32.377623]},{"name":"浙江省","cp":[120.543063,30.054592]},{"name":"安徽省","cp":[117.052631,30.620333]},{"name":"福建省","cp":[118.988333,26.330382]},{"name":"山东省","cp":[120.660563,35.950771]},{"name":"河南省","cp":[114.6248,36.166393]},{"name":"湖南省","cp":[113.009375,28.018179]},{"name":"四川省","cp":[104.326752,28.707822]},{"name":"云南省","cp":[102.673761,25.25729]},{"name":"甘肃省","cp":[103.589771,35.84729]},{"name":"宁夏回族自治区","cp":[105.929093,38.550037]},{"name":"河北省","cp":[114.462263,38.103261]},{"name":"天津市","cp":[117.482829,39.465574]},{"name":"黑龙江省","cp":[126.769939,45.799703]},{"name":"江西省","cp":[115.648219,28.62317]},{"name":"重庆市","cp":[106.252337,29.391458]},{"name":"新疆维吾尔自治区","cp":[87.291604,44.192248]},{"name":"广西壮族自治区","cp":[108.041486,22.470008]},{"name":"贵州省","cp":[106.992924,26.3067]},{"name":"陕西省","cp":[109.318578,33.8705]},{"name":"青海省","cp":[101.405759,36.809041]}]

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
          {/* this.model && this.geo && this.geo.features.map(d => {
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
          }) */}
          {this.model && testData.map(d => {
            const [ left, top ] = this.model.toXY(d.cp);
            return (
              <div
                key={d.name}
                className="test-dot"
                style={{left, top}}
              >
                {d.name}
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