import React from "react"
import { observer, inject } from "mobx-react"
import marked from "marked"
// import hljs from "highlight.js"
import { isNight } from "../../public/static/js/tools"

const renderer = new marked.Renderer()

function showMeArticle(id) {
  return require(`../../public/static/article/content/${id || 1}.md`)
}

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
    return (
      <div className="wrapper">
        <link
          href={`https://cdn.bootcss.com/highlight.js/9.15.10/styles/atom-one-${
            isNight() ? "dark" : "light"
          }.min.css`}
          rel="stylesheet"
        />
        <div className="block article-box wow fadeIn animated">
          <article>
            <div
              ref="article"
              dangerouslySetInnerHTML={{
                __html: showMeArticle(this.props.id)
              }}
            ></div>
          </article>
        </div>
      </div>
    )
  }

  componentDidMount() {
    console.log(this.props.id)
    if (this.props.id >= 0) {
      const blocks = document.querySelectorAll("pre code") || []
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i])
      }
    }
  }

  componentWillUpdate() {
    if (this.props.id >= 0) {
      alert(this.props.id)
      const blocks = document.querySelectorAll("pre code") || []
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i])
      }
    }
  }
}
export default ArticleContent
