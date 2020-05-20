import React, { Component } from 'react'
import request from '../../../utils/request'

import { PageHeader } from 'antd'

export default class ArticlePreview extends Component {
  state = {
    item: {}
  }

  componentDidMount() {
    request.get(`/articles/${this.props.match.params.id}`).then(res => {
      this.setState({
        item: res
      })
    })
  }


  render() {
    return (
      <div>
        {/* 页头 */}
        <PageHeader
          className="site-page-header"
          onBack={() => this.props.history.goBack()}
          title={this.state.item.title}
          subTitle="文章预览"
        />

        {/* 将 html 字符串转成 html 标签 */}
        <div
          style={{padding: '10px 25px'}}
          dangerouslySetInnerHTML={{ __html: this.state.item.content }}
        />
      </div>
    )
  }
}
