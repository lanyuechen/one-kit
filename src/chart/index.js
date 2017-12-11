import React, { Component } from 'react';
import BarChart from './chart/bar';

import './style.scss';

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { clientWidth, clientHeight } = this.refs.svg;

  }

  render() {
    return (
      <svg ref="svg" className="one-container">
        <BarChart />
      </svg>
    )
  }
}

export default Chart;