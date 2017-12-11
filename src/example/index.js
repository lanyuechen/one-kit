import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Mapping from '../mapping';

import defaultConfig from './data/defaultConfig.json';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Mapping
        img="data/bg.png"
        geoUrl="data/geo/china.json"
        width={1100}
        height={900}
        tris={defaultConfig.tris}
        data={defaultConfig.data}
      />
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));