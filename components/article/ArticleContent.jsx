import React from "react"
import { observer, inject } from "mobx-react"
import marked from "marked"
// import hljs from "highlight.js"
import { isNight } from "../../public/static/js/tools"
const cssUrl = `https://cdn.bootcss.com/highlight.js/9.15.10/styles/atom-one-${
  isNight() ? "dark" : "light"
}.min.css`

const renderer = new marked.Renderer()

marked.setOptions({
  renderer: renderer,
  highlight: function(code) {
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

@inject("mainStore")
@observer
class ArticleContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let __html
    try {
      __html = require(`../../public/static/article/content/${this.props.id}.md`)
      const detail = this.props.mainStore.getArticleDetail(this.props.id)
      const dic = {
        via: "原文地址：",
        time: "创建时间：",
        update: "最后编辑："
      }
      for (let item in detail) {
        if (dic[item] && detail[item]) {
          __html +=
            item === "via"
              ? `<p style="opacity: 0.7;">${dic[item]}<a href="${detail[item]}" target="_blank">${detail[item]}</p>`
              : `<p style="opacity: 0.7;">${dic[item]}${detail[item]}</p>`
        }
      }
    } catch {
      __html =
        '<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">但故事的最后你好像还是说了拜～</div>'
    }

    return (
      <div className="wrapper">
        <link href={cssUrl} rel="stylesheet" />
        <div className="block article-box wow fadeIn animated">
          <article>
            <div
              className="article"
              ref="article"
              dangerouslySetInnerHTML={{
                __html
              }}
            ></div>
          </article>
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (typeof this.props.id !== "undefined") {
      const blocks = document.querySelectorAll("pre code") || []
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i])
      }
    }
  }

  componentWillUpdate() {
    if (typeof this.props.id !== "undefined") {
      const blocks = document.querySelectorAll("pre code") || []
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i])
      }
    }
  }
}
export default ArticleContent
