import React from "react"
import { observer, inject } from "mobx-react"
import marked from "marked"

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
    return (
      <div className="wrapper">
        <link
          href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css"
          rel="stylesheet"
        />
        <script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
        <div className="block article-box wow fadeIn animated">
          <article>
            <div
              ref="article"
              dangerouslySetInnerHTML={{
                __html: require("../../public/static/article/content/test.md")
              }}
            ></div>
          </article>
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (hljs !== undefined) {
      hljs.configure({ useBR: true })

      document.querySelectorAll("code").forEach(block => {
        hljs.highlightBlock(block)
      })
    }
  }
}
export default ArticleContent
