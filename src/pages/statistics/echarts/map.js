import echarts from 'echarts';
import axios from 'axios';

/*
* @author msh
* */
class Map {
  _domElement = undefined;
  _chartInstance = undefined;

  _markData = undefined;
  _seriesData = undefined;
  _date = undefined;

  _renderSeries = false;
  _renderMark = false;
  _render = false;

  constructor(props) {
    let me = this;
    /* create ECharts instance */
    me._chartInstance = echarts.init(props._domElement);

    /* declaration ECharts default option */
    me.option = {
      visualMap: {
        min: 0,
        max: 100,
        hoverLink: false,
        inRange: {
          color: ['#00f7ff', '#0034CE']
        },
        outOfRange: {
          color: ['#00f7ff']
        },
        right: '1%',
        bottom: '1%',
        itemWidth: 10,
        itemHeight: 50,
        align: 'left',
        textStyle: {
          color: '#12ffff'
        }
      },
      tooltip: {
        formatter: props.tipCallBack,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: '#12ffff',
        borderWidth: 2,
        // position: function (point) {
        //   return [point[0], point[1] / 2]
        // },
        textStyle: {
          color: '#fff',
          fontSize: 16
        },
        extraCssText: 'z-index:999'
      },
      series: []
    };

    /* save colors */
    me._colors = props.colors;
  };

  get seriesData() {
    return this.seriesData;
  }

  set seriesData(data) {
    this._seriesData = data;
    this._renderSeries = true;
  }

  get markData() {
    return this.markData;
  }

  set markData(data) {
    this._markData = data;
    this._renderMark = true;
  }

  render(name) {
    let me = this;
    me._registerMap(1, name);
  }

  _drawMap(json) {
    let me = this;

    let series = me.option.series[0];
    let point = me.option.series[0].markPoint;

    if (me._renderSeries) {
      series.data = [];
      let max = Math.max(...me._seriesData.map(t => {
        return t.value
      }));
      let min = Math.min(...me._seriesData.map(t => {
        return t.value
      }));
      me.option.visualMap.max = max;
      me.option.visualMap.min = min;
      me.option.visualMap.text = [max, min];

      let s = me._seriesData;
      let len = s.length;
      if (len <= 0) {
        me.option.visualMap.show = false;
      } else {
        me.option.visualMap.show = true;
      }
      for (let i = 0; i < len; i++) {
        let m = s[i];
        series.data.push({
          name: m.name,
          value: m.value,
          msg: m
        })
      }

      me._renderSeries = false;
    }

    if (me._renderMark) {
      point.data = [];
      let md = me._markData;
      for (let i = 0; i < md.length; i++) {
        let m = md[i];
        let area = json.features.find(t => {
          return t.properties.name === m.name
        })
        point.data.push({
          name: m.name,
          coord: area ? area.properties.cp : [],
          msg: m,
          itemStyle: {
            normal: {
              color: me._colors[m.level]
            },
            emphasis: {
              shadowColor: me._colors[m.level]
            }
          }
        });
      }
      me._renderMark = false;
    }

    me._chartInstance.setOption(me.option, true);
  }

  _registerMap(n, name) {
    let me = this;
    let jsonNameMap = {
      "云南省": "530000",
      "云南省all": "yunnan",
      "临沧市": "530921",
      "丽江市": "530702",
      "保山市": "530521",
      "大理白族自治州": "532901",
      "德宏傣族景颇族自治州": "533122",
      "怒江僳僳族自治州": "533323",
      "文山壮族苗族自治州": "532626",
      "昆明市": "530113",
      "昭通市": "530630",
      "普洱市": "530823",
      "曲靖市": "530302",
      "楚雄彝族自治州": "532325",
      "玉溪市": "530425",
      "红河哈尼族彝族自治州": "532527",
      "西双版纳傣族自治州": "532823",
      "迪庆藏族自治州": "533422"
    };

    let series = me.option.series = [];
    axios.get(`./static/json/${jsonNameMap[name]}.json`).then(res => {
      echarts.registerMap('map', res.data);
      series.push({
        type: 'map',
        mapType: 'map',
        aspectScale: 0.9,
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#00f7ff',
            borderColor: '#013fcf',
            borderWidth: 1
          },
          emphasis: {
            areaColor: '#00f7ff',
          }
        },
        layoutCenter: ['50%', '45%'],
        layoutSize: name === '云南省' ? '100%' : 'auto',
        label: {
          normal: {
            show: true,
            color: '#fff',
            fontSize: 16
          },
          emphasis: {
            show: true,
            color: '#fff'
          }
        },
        data: [],
        markPoint: {
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: '#333'
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          symbol: 'rect',
          symbolSize: 10,
          data: []
        },
        silent: false
      });
      me._drawMap(res.data);
    })
  }

  on(type, fn) {
    if (type === 'click') {
      this._chartInstance.on('click', fn);
    }
  }

  dispose() {
    this._chartInstance.dispose();
  }

  resize() {
    this._chartInstance.resize();
  }
}

export default Map;
