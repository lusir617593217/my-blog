import React, { Component } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

// 引入组件
import ArticleList from './ArticleList'
import ArticleClassify from './ArticleClassify'
import ArticleCreate from './ArticleCreate'
import ArticleUpdate from './ArticleUpdate'
import ArticlePreview from './ArticlePreview'

export default class Article extends Component {

  render() {
    const { roleType } = JSON.parse(localStorage.getItem('token'))

    return (
      <div>
        <Switch>
          <Route path="/article-manage/list" component={ArticleList}/>
          <Route path="/article-manage/create" component={ArticleCreate}/>
          <Route path="/article-manage/update/:id" component={ArticleUpdate}/>
          <Route path="/article-manage/preview/:id" component={ArticlePreview}/>
          {
            roleType >= 2 && <Route path="/article-manage/classify" component={ArticleClassify}/>
          }
        </Switch>
      </div>
    )
  }
}
