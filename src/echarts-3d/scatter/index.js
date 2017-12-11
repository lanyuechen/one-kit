const config = {
  xAxis3D: 'x',
  xAxis3DName: '全流程电子化交易比率',
  yAxis3D: 'y',
  yAxis3DName: '电子化交易招标项目量',
  zAxis3D: 'z',
  zAxis3DName: '数据交互共享规模',
  color: 'c',
  symbolSiz: 's'
};

const data = [
  [12, 5, 25, 4, '#76b236', '北京市'],
  [12, 25, 5, 4, '#dd8116', '福州市'],
  [24, 25, 20, 4, '#dc3c1c', '广州市'],
  [44, 5, 13, 4, '#a02ee1', '武汉市'],
  [52, 26, 20, 4, '#2e70e0', '深圳市']
];

const container = document.getElementById('container');

const chart = echarts.init(container);

const axis = {
  splitLine: {
    show: true,
    lineStyle: {
      color: [
        "#225c9f"
      ]
    }
  },
  splitArea: {
    show: true,
    areaStyle: {
      color: [
        "rgba(34, 93, 161, 0.1)",
        "rgba(34, 93, 161, 0.1)"
      ]
    }
  },
  axisLine: {
    lineStyle: {
      width: 0
    }
  },
  axisTick: {
    length: 0
  }
};

const option = {
  xAxis3D: {
    name: config.xAxis3DName,
    nameGap: 15,
    type: 'value',
    min: 0,
    max: 60,
    interval: 12,
    axisLabel: {
      margin: 3,
      formatter: function(param) {
        if(param === 0) {
          return '';
        }
        return param * 10 / 6 + '%';
      }
    },
    ...axis
  },
  yAxis3D: {
    name: config.yAxis3DName,
    nameGap: 15,
    type: 'value',
    min: 0,
    max: 30,
    interval: 15,
    axisLabel: {
      margin: 3,
      formatter: function(param) {
        param = 30 - param;
        if(param === 0) {
          return '';
        }
        return param * 1000 / 3
      }
    },
    ...axis
  },
  zAxis3D: {
    name: config.zAxis3DName,
    nameGap: 15,
    type: 'value',
    min: 0,
    max: 30,
    interval: 10,
    axisLabel: {
      margin: 3,
      formatter: function(param) {
        if(param === 0) {
          return '';
        }
        return param * 5000;
      }
    },
    ...axis
  },
  grid3D: {
    boxWidth: 200,
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisPointer: {
      show: false
    },
    viewControl: {
      alpha: 0,
      distance: 250,
      autoRotate: true
    }
  },
  series: [
    ...data.map(d => ball(...d)),
    {
      type: 'scatter3D',
      symbolSize: 0,
      itemStyle: {
        opacity: 1,
        color: 'transparent'
      },
      label: {
        show: true,
        position: 'bottom',
        formatter: '{b}',
        textStyle: {
          color: '#fff',
          backgroundColor: 'transparent',
          fontSize: 18
        }
      },
      data: data.map(d => ({name: d[5], value: [d[0], d[1], d[2] - 5]}))
    }
  ]
};

chart.setOption(option);

function ball(x, y, z, s, c, n) {
  return {
    name: n,
    type: 'surface',
    parametric: true,
    shading: 'realistic',   //realistic
    wireframe: false,
    itemStyle: {
      color: c
    },
    parametricEquation: {
      u: {
        min: - Math.PI * 0.5,
        max: Math.PI * 1.5,
        step: Math.PI / 10
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20
      },
      x: function (u, v) {
        return Math.sin(v) * Math.sin(u) * s + x;
      },
      y: function (u, v) {
        return Math.sin(v) * Math.cos(u) * s + y;
      },
      z: function (u, v) {
        return Math.cos(v) * s + z;
      }
    }
  }
}