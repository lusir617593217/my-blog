import React, { Component } from 'react'
import request from '../../utils/request'
// 引入粒子效果库
import Particles from 'react-particles-js'
// 引入样式
import style from './index.module.css'
// 引入高阶组件 withRouter
import { withRouter } from 'react-router'

// 引入表单
import { Form, Input, Button, Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

class Login extends Component {
  render() {
    return (
      <div id="login">
        <Particles height={window.innerHeight - 5} />

        <div className={style.container}>
          <p className={style.title}>BLOG 管理系统</p>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                autoComplete="true"
              />
            </Form.Item>

            <Form.Item>
              <div className="login-btn">
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
              </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }

  onFinish = (values) => {
    request.get(`/users?username=${values.username}&password=${values.password}&roleState=${true}`)
    .then(res => {
      if (res.length > 0) { // 登录成功
        const token = {
          id: res[0].id,
          username: res[0].username,
          roleType: res[0].roleType,
          roleName: res[0].roleName
        }

        localStorage.setItem('token', JSON.stringify(token))
        this.props.history.push('/home')
      } else { // 登录失败
        Modal.error({
          content: '用户名密码不匹配，或没有登录状态！'
        })
      }
    })



  }
}

export default withRouter(Login)
