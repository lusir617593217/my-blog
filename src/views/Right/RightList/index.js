import React, { Component } from 'react'
import request from '../../../utils/request'

import { Table, Tag } from 'antd'

export default class RightList extends Component {
  state = {
    listData: []
  }

  columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: id => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '权限等级',
      dataIndex: 'grade',
      key: 'grade',
      render: grade => {
        const arr = ['green', 'orange', 'red']
        return <div className="grade"><Tag color={arr[grade-1]}>{grade}</Tag></div>
      }
    }
  ]

  componentDidMount() {
    request.get('/rights').then(res => {
      this.setState({
        listData: res
      })
    })
  }

  render() {
    return (
      <Table columns={this.columns} dataSource={this.state.listData} pagination={{ pageSize: 5 }} />
    )
  }
}

