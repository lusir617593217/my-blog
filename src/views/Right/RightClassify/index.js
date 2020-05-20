import React, { Component } from 'react'
import request from '../../../utils/request'
import { connect } from 'react-redux'

import { Table, Tag, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

class RightClassify extends Component {

  columns = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'id',
    },
    {
      title: '操作',
      key: 'id',
      render: () => <Button disabled shape="circle" icon={<SearchOutlined />} />
    }
  ]

  componentDidMount() {
    // 判断 store 中获取来的 listData 是否有数据，没有数据就发送一个 action 获取数据
    if (this.props.listData.length === 0) {
      this.props.getListDate()
    }
  }
  render() {
    return (
      <Table
        columns={this.columns}
        rowKey={data => data.id}
        expandable={{
          expandedRowRender: data => {
            return (
              data.roleRight.map((item, index) => (
                <div key={index}>
                  {
                    item.list.map((childrenItem, index) => (
                      <Tag key={index} color="green">{childrenItem}</Tag>
                    ))
                  }
                </div>
              ))
            )
          }
        }}
        dataSource={this.props.listData}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listData: state.listData
  }
}

// 写法一
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getListDate: () => {
//       request.get('/roles').then(res => {
//         dispatch({
//           type: 'get_list_data',
//           listData: res
//         })
//       })
//     }
//   }
// }

// 写法二
const mapDispatchToProps = {
  getListDate: () => {
    return request.get('/roles').then(res => {
      return {
        type: 'get_list_data',
        listData: res
      }
    })

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RightClassify)
