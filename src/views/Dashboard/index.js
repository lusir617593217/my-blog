import React, { Component } from 'react'
import './index.css'
// 引入自定义组件
import SideBar from './SideBar'
import TopBar from './TopBar'
import MyContent from './MyContent'

import { Layout } from 'antd';

export default class DashBoard extends Component {


  render() {
    return (
      <Layout>
        {/* 侧边栏 */}
        <SideBar />
        <Layout className="site-layout">
          {/* 顶部导航 */}
          <TopBar />

          {/* 内容区 */}
          <MyContent />
        </Layout>
      </Layout>
    )
  }
}
