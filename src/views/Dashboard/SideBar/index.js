import React, { PureComponent } from 'react'
// import bus from '../../../utils/bus'
import SideBarData from '../../../routers/sideBarData'
// 引入高阶组件
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

// 引入导航菜单
import { Layout, Menu } from 'antd'

const { SubMenu } = Menu;

const { Sider } = Layout;

class SideBar extends PureComponent {
  // state = {
  //   collapsed: false
  // }

  // 渲染侧边栏数据
  renderSideBar = (menus) => {
    // 获取当前用户的登录权限等级
    const { roleType } = JSON.parse(localStorage.getItem('token'))

    return menus.map(item => {
      if (item.children && roleType >= item.permission) {
        return (
          <SubMenu key={item.path} icon={<item.icon />} title={item.title}>
            {/* 递归调用 */}
            {this.renderSideBar(item.children)}
          </SubMenu>
        )
      } else {
        if (roleType >= item.permission) {
          return (
            <Menu.Item key={item.path} icon={<item.icon />}>
              {item.title}
            </Menu.Item>
          )
        }

        return null
      }
    })
  }

  // 路由跳转
  go = (options) => {
    // 保存到 store 中
    if (options.key === '/right-manage/list' || options.key === '/right-manage/classify') {
      this.props.setRouterValue({
        type: 'router_value',
        routerValue: options.key
      })
    }
    this.props.history.push(options.key)
  }

  render() {
    let str = this.props.location.pathname === '/' ? '/home' : this.props.location.pathname
    const arr = str.split('/')
    const defaultOpen = '/' + arr[1]
    let  defaultLight = str
    if (defaultOpen === '/right-manage') {
      // 如果打开的是 /right-manage 这个选项，默认高亮就用全局的状态
      defaultLight = this.props.routerValue
    }
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        {/* <div className="logo" /> */}

        <Menu
          selectedKeys={[defaultLight]}
          defaultOpenKeys={[defaultOpen]}
          mode="inline"
          theme="dark"
          onClick={this.go}
        >
          {this.renderSideBar(SideBarData)}
        </Menu>
      </Sider>
    )
  }

  componentDidMount() {
    // 自己实现的发布订阅模式，改变是否折叠的状态
    // bus.$on('changeColl', () => {
    //   this.setState({
    //     collapsed: !this.state.collapsed
    //   })
    // })

    // redux 中实现的
    // 监听 store 中的 state 的改变（订阅）store.getState() 可以得到 state 数据
    // this.unsubscribe = store.subscribe(() => {
    //   this.setState({
    //     collapsed: store.getState().collapsed
    //   })
    // })
  }

}

const mapDispatchToProps = {
  setRouterValue: (action) => {
    return action
  }
}

const mapStateToProps = (state) => {
  return {
    routerValue: state.routerValue,
    collapsed: state.collapsed
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar))
