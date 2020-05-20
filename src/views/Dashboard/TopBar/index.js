import React, { Component } from 'react'
// import bus from '../../../utils/bus'
import { withRouter } from 'react-router';
import store from '../.././../store'

import { Layout, Avatar, Dropdown, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Header } = Layout;


class TopBar extends Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    setTimeout(() => {
      this.setState({
        collapsed: !this.state.collapsed
      })
      // bus.$emit('changeColl')

      store.dispatch({
        type: 'change_collapsed',
        collapsed: this.state.collapsed
      })
    }, 0)
  }

  // 退出
  exit = (obj) => {
    if (obj.key === "exit") {
      localStorage.removeItem('token')
      this.props.history.push('/login')
    }
  }

  render() {
    const userInfo = JSON.parse(localStorage.getItem('token'))

    const menu = (
      <Menu onClick={this.exit}>
        <Menu.Item key="user">{userInfo.roleName}</Menu.Item>
        <Menu.Item key="exit">退出</Menu.Item>
      </Menu>
    )

    return (
      <Header className="site-layout-background" style={{ padding: "0 24px" }}>
        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: this.toggle,
        })}

        <Dropdown overlay={menu}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
        <span className="welcome">欢迎 {userInfo.username} 回来</span>
      </Header>
    )
  }
}

export default withRouter(TopBar)
