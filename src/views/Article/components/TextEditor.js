import React, { Component } from 'react'

// 富文本编辑器
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

export default class TextEditor extends Component {
  state = {
    editorState: '', // 编辑器初始状态
    // contentState: '',
    contentData: '' // 编辑器输入的内容对象
  }

  componentDidMount() {
    // 将 html 字符串转成编辑器转态对象，用于数据回填
    if (this.props.initContent) {
      const html = this.props.initContent
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        this.setState({
          editorState
        })
      }
    }
  }

  // 编辑器转态改变，同步编辑器初始状态
  onEditorStateChange = (values) => {
    this.setState({
      editorState: values
    })
  }

  // 内容改变，保存内容对象
  getContentData = (values) => {
    this.setState({
      contentData: values
    })
  }

  // 失去焦点就将内容转成 HTML 字符串传递给父组件
  contentDataToHtml = () => {
    this.props.onGetContent(draftToHtml(this.state.contentData))
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        // contentState={this.state.contentState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onBlur={this.contentDataToHtml}
        onContentStateChange={this.getContentData}  // 获取输入的内容对象
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}
