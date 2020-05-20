import React, { Component } from 'react'
// 引入 router-react-dom
import {
  HashRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

// 引入自定义组件
import Login from '../views/Login'
import DashBoard from '../views/Dashboard'

export default class Router extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/' render={() =>
            localStorage.getItem('token') ?
            <DashBoard/> :
            <Redirect to='/login'/>
          }/>
        </Switch>
      </HashRouter>
    )
  }
}
