import React from "react"
import { observer, inject } from "mobx-react"
import marked from "marked"
import { isNight } from "../../public/static/js/tools"
const cssUrl = `https://cdn.bootcss.com/highlight.js/9.15.10/styles/atom-one-${
  isNight() ? "dark" : "light"
}.min.css`
import translate, { parseMultiple } from "google-translate-open-api"

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
        update: "最后编辑：",
        repo: "仓库地址：",
        category: "分类："
      }
      for (let item in detail) {
        if (dic[item] && detail[item]) {
          __html += ["via", "repo"].includes(item)
            ? `<p style="opacity: 0.7;">${dic[item]}<a href="${detail[item]}" target="_blank">${detail[item]}</p>`
            : `<p style="opacity: 0.7;">${dic[item]}${detail[item]}</p>`
        }
      }

      __html =
        `<h1 class="article-title">${detail["title"]}</h1>${
          detail["time"] ? `<p><small style="margin-bottom: 4rem;">${detail["time"]}</small></p>` : ""
        }` + __html
    } catch {
      __html =
        '<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">但故事的最后你好像还是说了拜～</div>'
    }

    translate("你好", {
      tld: "cn",
      to: "en"
    }).then(res => {
      console.log(res)
      // const data = res.data[0]
      // const parseData = parseMultiple(data)
      // console.log(parseData)
    })

    return (
      <div className="wrapper">
        <link href={cssUrl} rel="stylesheet" />
        <div className="block article-box wow fadeIn animated">
          <article>
            <div
              className="article"
              ref="article"
              id="article"
              dangerouslySetInnerHTML={{
                __html
              }}
            ></div>

            <button onClick={this.getHtml}>哈哈</button>
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

  getHtml() {
    let dom = document.getElementById("article").childNodes
    let translateTree = [],
      translateArr = [],
      translateRes = []
    for (let i = 0; i < dom.length; i++) {
      if (
        dom[i].localName &&
        ["p", "h1", "h2", "h3", "h4", "h5"].includes(dom[i].localName)
      ) {
        translateTree.push(dom[i])
        translateArr.push(dom[i]["innerHTML"])
      }
    }

    console.log(translateArr)

    translate(translateArr, {
      tld: "cn",
      to: "en",
      browers: true
    }).then(res => {
      const data = res.data[0]
      translateRes = parseMultiple(data)
      for (let i = 0; i < translateArr.length; i++) {
        translateTree[i].innerHTML = translateRes[i]
      }
    })
  }
}
export default ArticleContent
