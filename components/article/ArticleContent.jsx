import React from "react"
import { observer, inject } from "mobx-react"
import marked from "marked"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import { md2html } from "../../public/static/js/tools"

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
        <div className="block article-box wow fadeIn animated">
          <article>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(md2html(), {
                  renderer: renderer
                })
              }}
            ></div>
          </article>
        </div>
      </div>
    )
  }

  componentDidMount() {}
}

export default ArticleContent
