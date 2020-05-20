import React, { Component } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
// 引入组件
import Home from '../../Home'
import Users from '../../Users'
import Right from '../../Right'
import Article from '../../Article'

import { Layout } from 'antd';
const {  Content } = Layout;

export default class MyContent extends Component {
  render() {
    const { roleType } = JSON.parse(localStorage.getItem('token'))

    return (
      <Content
        className="site-layout-background"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 'auto',
        }}
      >
        <Switch>
          <Route path="/home" component={Home}/>
          {
            roleType >= 3 && <Route path="/users-manage/user" component={Users}/>
          }
          {
            roleType >= 3 && <Route path="/right-manage" component={Right}/>
          }
          <Route path="/article-manage" component={Article}/>
          <Redirect from="/" to="/home"/>
        </Switch>
      </Content>
    )
  }
}
