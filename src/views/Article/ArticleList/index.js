import React, { Component } from 'react'
import request from '../../../utils/request'

import { Button, Table, message } from 'antd'
import { EditOutlined, DeleteOutlined, ChromeOutlined } from '@ant-design/icons'

export default class ArticleList extends Component {
  state = {
    dataList: []
  }

  columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '文章作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '文章类别',
      dataIndex: "category",
      key: 'category',
      render: (category) => (
        category.join('/')
      )
    },
    {
      title: '操作',
      key: 'operation',
      render: (item) => (
        <div>
          <Button
            shape="circle"
            icon={<ChromeOutlined />}
            onClick={() => this.goPreview(item)}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => this.goUpdate(item)}
          />
          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => this.goDelete(item.id)}
          />
        </div>
      )
    }
  ]

  // 点击更新
  goUpdate = (item) => {
    this.props.history.push({
      pathname: `/article-manage/update/${item.id}`,
      state: item
    })
  }

  // 点击删除
  goDelete = (id) => {
    request.delete(`/articles/${id}`).then(res => {
      this.setState({
        dataList: this.state.dataList.filter(item => item.id !== id)
      })
      message.success('删除成功！')
    })
  }

  // 点击预览
  goPreview = (item) => {
    this.props.history.push(`/article-manage/preview/${item.id}`)
  }

  render() {
    return (
      <div>
        <Button type="primary"
          onClick={() => this.props.history.push('/article-manage/create')}>
          添加文章
        </Button>

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
    request.get('/articles').then(res => {
      this.setState({
        dataList: res
      })
    })
  }

}
