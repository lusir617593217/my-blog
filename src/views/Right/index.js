import React, { Component } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'

// 引入组件
import RightList from './RightList'
import RightClassify from './RightClassify'

import { Tabs } from 'antd'
const { TabPane } = Tabs

class Right extends Component {
  toggle = (value) => {
    // 同步 store 中的 state
    this.props.setRouterValue({
      type: 'router_value',
      routerValue: value
    })
    this.props.history.push(value)
  }

componentDidMount () {
  this.props.setRouterValue({
    type: 'router_value',
    routerValue: this.props.location.pathname
  })
}

  render() {
    const defaultOpen = this.props.location.pathname
    return (
      <div>
        {/* 导航 */}
        <Tabs
          defaultActiveKey={defaultOpen}
          activeKey={this.props.routerValue}
          onChange={this.toggle}
        >
          <TabPane tab="角色列表" key="/right-manage/classify"></TabPane>
          <TabPane tab="权限列表" key="/right-manage/list"></TabPane>
        </Tabs>

        <Switch>
          <Route path="/right-manage/list" component={RightList} />
          <Route path="/right-manage/classify" component={RightClassify} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    routerValue: state.routerValue
  }
}

const mapDispatchToProps = {
  setRouterValue: (action) => {
    return action
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Right)
