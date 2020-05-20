import React, { Component } from 'react'
import echarts from 'echarts'
import request from '../../../utils/request'
// lodash 做数据格式转换，在 react 和 vue 中无须手动下载
import _ from 'lodash'

export default class ArticleClassify extends Component {

  // 存放格式转换后的数据
  optionData = {}

  initChart = () => {
    this.myChart = echarts.init(this.refs.myECharts)

    const option = {
      title: {
        text: '用户创建文章数统计表',
        textStyle: {
          color: '#333',
          fontSize: 16
        }
      },
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'none'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: Object.keys(this.optionData),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          minInterval: 1,
          // type: 'value'
        }
      ],
      series: [
        {
          name: '创建文章数',
          type: 'bar',
          // barWidth: '80%',
          data: Object.values(this.optionData).map(item => item.length)
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
  }

  componentDidMount() {
    request.get('/articles').then(res => {
      // 利用 lodash 转换数据格式
      this.optionData = _.groupBy(res, 'author')

      // 渲染图表
      this.initChart()
    })

    window.onresize = () => {
      // 窗口改变重新刷新图表
      this.myChart.resize()
    }
  }

  componentWillUnmount() {
    // 解绑 onresize 事件
    window.onresize = null
  }

  render() {
    return (
      <div ref='myECharts' style={{ width: '100%', height: '450px' }}></div>
    )
  }
}
