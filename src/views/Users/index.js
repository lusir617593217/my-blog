import React, { PureComponent } from 'react'
import request from '../../utils/request'

import { Button, Table, Switch, Modal, Form, Input, Select } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal
const { Option } = Select

export default class Users extends PureComponent {
  state = {
    dataList: [],
    currentItem: {}, // 存放当前编辑的 item
    isCreate: false, // 控制添加用户模态框显示隐藏
    isEdit: false  // 控制编辑用户模态框显示隐藏
  }

  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户状态',
      key: 'id',
      render: (item) => (
        <Switch
          disabled={item.default}
          defaultChecked={item.roleState}
          onChange={()=> this.onChange(item)}
        />
      )
    },
    {
      title: '操作',
      key: 'operation',
      render: (item) => (
        <div>
          <Button
            type="primary"
            disabled={item.default}
            onClick={() => this.edit(item)}
            shape="circle"
            icon={<EditOutlined />}
          />
          <Button
            type="danger"
            disabled={item.default}
            onClick={() => this.remove(item.id)}
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </div>
      )
    }
  ]

  // 改变用户状态
  onChange = (item) => {
    // 更新状态
    request.put(`/users/${item.id}`, {
      ...item,
      roleState: !item.roleState
    }).then(res => {
      // 同步页面数据
      this.setState({
        dataList: this.state.dataList.map(listItem => {
          if (listItem.id === item.id) {
            return item
          } else {
            return listItem
          }
        })
      })
    })
  }

  // 编辑用户按钮，显示编辑模态框
  edit = (item) => {
    setTimeout(() => { // 将 setState 变成同步执行
      this.setState({
        isEdit: true,
        currentItem: item
      })

      // 数据回填
      this.refs.editForm.setFieldsValue({
        username: item.username,
        password: item.password,
        roleType: item.roleType
      })
    }, 0);

  }

  // 编辑框确定编辑
  handleEditOk = () => {
    this.refs.editForm
      .validateFields() // 自动校验
      .then(values => {
        this.updatedTable(values)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  // 更新表格，数据保存至数据库
  updatedTable = (values) => {
    const roleArr = ["小编", "管理员", "超级管理员"]
    request.put(`/users/${this.state.currentItem.id}`, {
      ...this.state.currentItem,
      ...values,
      roleName: roleArr[values.roleType - 1]
    }).then(res => {
      // 同步页面数据
      this.setState({
        dataList: this.state.dataList.map(item => {
          if (item.id === res.id) {
            return res
          } else {
            return item
          }
        }),
        isEdit: false
      })
    })
  }

  // 删除用户
  remove = (id) => {
    confirm({
      title: '你确定要删除吗？',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        request.delete(`/users/${id}`).then(res => {
          console.log("删除成功")
        })
        this.setState({
          dataList: this.state.dataList.filter(item => item.id !== id)
        })
      }
    })
  }

  // 添加用户按钮，显示添加表单
  addUser = () => {
    this.setState({
      isCreate: true
    })
  }

  // 确定添加用户
  handleAddOk = (e) => {
    e.preventDefault()
    this.refs.form
      .validateFields() // 自动校验
      .then(values => {
        this.refs.form.resetFields() // 重置表单
        this.renderTable(values)
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })
  }

  // 添加数据，重新刷新table
  renderTable = (values) => {
    const { username, password, roleType } = values
    const roleArr = ["小编", "管理员", "超级管理员"]

    request.post('/users', {
      username,
      password,
      roleType,
      roleState: false,
      roleName: roleArr[roleType - 1]
    }).then(res => {
      this.setState({
        isCreate: false,
        dataList: [...this.state.dataList, res]
      })
    })
  }

  // 取消添加用户
  handleCancel = () => {
    this.setState({
      isCreate: false
    })
  }

  render() {
    return (
      <div>
        {/* 添加用户表单 */}
        <Button onClick={this.addUser} type="primary">添加用户</Button>

        {/* 创建用户模态框 */}
        <Modal
          visible={this.state.isCreate}
          title="添加用户"
          okText="OK"
          cancelText="Cancel"
          onOk={this.handleAddOk}
          onCancel={this.handleCancel}
        >
          <Form
            ref="form"
            layout="vertical"
            name="form_in_modal"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: 'Please input the username of collection!' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: 'Please input the password of collection!' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              name="roleType"
              label="角色"
              rules={[{ required: true, message: 'Please select the roleType of collection!' }]}
            >
              <Select
                showSearch
                placeholder="请选择角色"
              >
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* 编辑用户模态框 */}
        <Modal
          visible={this.state.isEdit}
          title="编辑用户"
          okText="编辑"
          cancelText="取消"
          onOk={this.handleEditOk}
          onCancel={() => this.setState({isEdit: false})}
        >
          <Form
            ref="editForm"
            layout="vertical"
            name="form_in_modal"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: 'Please input the username of collection!' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: 'Please input the password of collection!' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              name="roleType"
              label="角色"
              rules={[{ required: true, message: 'Please select the roleType of collection!' }]}
            >
              <Select
                showSearch
                placeholder="请选择角色"
              >
                <Option value={3}>超级管理员</Option>
                <Option value={2}>管理员</Option>
                <Option value={1}>小编</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        <Table
          dataSource={this.state.dataList}
          columns={this.columns}
          rowKey={data => data.id}
          pagination={{ pageSize: 6 }}
        />
      </div>
    )
  }

  componentDidMount() {
    request.get('/users').then(res => {
      this.setState({
        dataList: res
      })
    })
  }
}
