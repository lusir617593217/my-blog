import React, { Component } from 'react'
import MyForm from '../components/MyForm'
import TextEditor from '../components/TextEditor'
import request from '../../../utils/request'

import { PageHeader, Steps, Button, message } from 'antd'
const { Step } = Steps

export default class ArticleCreate extends Component {
  state = {
    current: 0, // 当前步骤
    formData: {}, // 步骤一中的表单值
    editorData: '' // 编辑器的内容
  }

  // 下一步
  next = () => {
    if (this.state.current === 0) {
      // 拿到子组件中的 form 表单对象
      this.refs.formCom.refs.form
        .validateFields() // 自动校验
        .then(values => {
          this.setState({
            formData: values,
            current: this.state.current + 1
          })
        })
        .catch(info => {
          // console.log('Validate Failed:', info)
        })
    } else {
      this.setState({
        current: this.state.current + 1
      })
    }

  }

  // 上一步
  prev = () => {
    this.setState({
      current: this.state.current - 1
    })
  }

  // 提交
  submit = () => {
    const { username, roleType } = JSON.parse(localStorage.getItem('token'))

    // 保存数据至数据库
    request.post('/articles', {
      ...this.state.formData,
      author: username,
      content: this.state.editorData,
      roleType
    }).then(res => {
      message.success('创建成功！')
      this.props.history.push('/article-manage/list')
    })
  }

  render() {
    return (
      <div>
        {/* 页头 */}
        <PageHeader
          className="site-page-header"
          onBack={() => this.props.history.goBack()}
          title="添加文章"
          subTitle="八仙过海，各显其能"
        />

        {/* 步骤条 */}
        <Steps current={this.state.current}>
          <Step key="0" title="基本信息" />
          <Step key="1" title="文章内容" />
          <Step key="2" title="提交文章" />
        </Steps>

        {/* form */}
        <div style={{ display: this.state.current === 0 ? 'block' : 'none' }}>
          <MyForm ref='formCom' />
        </div>

        {/* 富文本编辑器 */}
        <div style={{
          display: this.state.current === 1 ? 'block' : 'none',
          padding: '10px 20px 4px'
        }}>
          <TextEditor onGetContent={(values => this.setState({editorData: values}))}/>
        </div>

        {/* 提交提示 */}
        <div style={{
          display: this.state.current === 2 ? 'block' : 'none',
          padding: '50px 20px 20px',
          height: '200px'
        }}>
          信息填写完成，请确定无误后提交！！！
        </div>


        {/* 按钮 */}
        <div className="steps-action" style={{ display: "flex", padding: "10px 25px" }}>
          {this.state.current < 2 && (
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          )}

          {this.state.current === 2 && (
            <Button type="primary" onClick={this.submit} >提交</Button>
          )}


          {this.state.current > 0 && (
            <Button type="primary" style={{ margin: '0 8px' }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </div>
    )
  }
}
