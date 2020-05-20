import React, { Component } from 'react'
import request from '../../../utils/request'
import propsTypes from 'prop-types'

import { Form, Input, Cascader } from 'antd'

export default class MyForm extends Component {
  state = {
    options: []
  }

  static propsTypes = {
    initValue: propsTypes.object
  }

  static defaultProp = {
    initValue: {}
  }

  componentDidMount() {
    request.get('/categories').then(res => {
      this.setState({
        options: res
      })
    })
  }

  render() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }

    return (
      <div style={{ padding: "30px 0" }}>
        <Form
          ref="form"
          name="form_in_modal"
          {...layout}
          initialValues={this.props.initValue}
        >
          <Form.Item
            name="title"
            label="文章标题"
            rules={[{ required: true, message: 'Please input the title of collection!' }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>

          <Form.Item
            name="category"
            label="文章分类"
            rules={[{ required: true, message: 'Please select the category of collection!' }]}
          >
            <Cascader
              options={this.state.options}
              placeholder="Please select"
              fieldNames={{label: 'title'}}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
