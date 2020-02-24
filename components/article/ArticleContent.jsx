import React from "react"
import { observer, inject } from "mobx-react"
import marked from "marked"
import { isNight } from "../../public/static/js/tools"
const cssUrl = isNight()
  ? `https://cdn.bootcss.com/highlight.js/9.18.1/styles/atelier-sulphurpool-dark.min.css
`
  : `https://cdn.bootcss.com/highlight.js/9.15.10/styles/atom-one-dark.min.css`
import { parseMultiple } from "google-translate-open-api"
import { Alert } from "antd"
import axios from "axios"

const renderer = new marked.Renderer()
let that, __html

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

  state = {
    lang: "cn",
    __html: null,
    lastTree: null,
    bowserLang: "zh-CN"
  }

  render() {
    try {
      __html = require(`../../public/static/article/content/${this.props.id}.md`)
      const detail = this.props.mainStore.getArticleDetail(this.props.id)
      const dic = {
        via: "原文地址：",
        time: "创建时间：",
        update: "最后编辑：",
        repo: "项目地址：",
        category: "分类："
      }
      for (let item in detail) {
        if (dic[item] && detail[item]) {
          __html += ["via", "repo"].includes(item)
            ? `<p style="opacity: 0.7;">${dic[item]}<a href="${detail[item]}" target="_blank">${detail[item]}</a></p>`
            : `<p style="opacity: 0.7;">${dic[item]}${detail[item]}</p>`
        }
      }

      __html =
        `<h1 class="article-title">${detail["title"]}</h1>${
          detail["time"]
            ? `<p><small style="margin-bottom: 4rem;">${detail["time"]}</small></p>`
            : ""
        }` + __html
    } catch {
      __html =
        '<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">但故事的最后你好像还是说了拜～</div>'
    }

    return (
      <div className="wrapper">
        <link href={cssUrl} rel="stylesheet" />
        <div className="block article-box wow fadeIn animated">
          <Alert
            closable
            style={{ marginBottom: "1rem", opacity: isNight() ? "0.7" : "1" }}
            message={
              <div>
                <div
                  style={{
                    display: this.state.lang == "cn" ? "block" : "none"
                  }}
                  className="flex-row"
                >
                  <span>Translated by Google into: </span>
                  <a onClick={() => this.setLang("en")}>English</a>
                  <a onClick={() => this.setLang("zh-tw")}>繁體中文</a>
                  <a onClick={() => this.setLang("fr")}>French</a>
                  <a onClick={() => this.setLang("ja")}>日本語</a>
                </div>
                <div
                  style={{
                    display: this.state.lang !== "cn" ? "block" : "none"
                  }}
                  className="flex-row"
                >
                  <span>Back to Language: </span>
                  <a onClick={() => this.setLang("cn")}>简体中文</a>
                </div>
              </div>
            }
            type={isNight() ? "warning" : "success"}
          />
          <article>
            <div
              className="article"
              ref="article"
              id="article"
              style={{ display: this.state.lang !== "cn" ? "none" : "block" }}
              dangerouslySetInnerHTML={{
                __html: this.state.__html || __html
              }}
            ></div>

            <div
              className="article"
              id="translator"
              style={{ display: this.state.lang == "cn" ? "none" : "block" }}
            ></div>
          </article>
        </div>
      </div>
    )
  }

  highlightCode() {
    if (typeof this.props.id !== "undefined") {
      const blocks = document.querySelectorAll("pre code") || []
      for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i])
      }
    }
  }

  componentDidMount() {
    this.highlightCode()
    if (window && window.navigator && window.navigator.language) {
      this.setState({
        bowserLang: window.navigator.language
      })
    }
    that = this
  }

  componentWillUpdate() {
    this.highlightCode()
  }

  setLang(lang) {
    this.translateIt(lang)
  }

  translateIt(e) {
    if (e && e.persist) e.persist()

    let nextLang = e ? e : that.state.lang !== "cn" ? "cn" : "en"

    if (nextLang == "cn") {
      that.setState({
        lang: nextLang,
        __html:
          __html + `<div style="display: none;">${new Date().valueOf()}</div>`
      })
      setTimeout(() => {
        that.highlightCode()
      }, 0)
      return
    }

    if (nextLang == that.state.lang) return

    let dom = [...document.getElementById("article").childNodes].slice()

    let translateTree = [],
      translateArr = [],
      translateRes = []
    for (let i = 0; i < dom.length; i++) {
      if (
        dom[i].localName &&
        ["p", "h1", "h2", "h3", "h4", "h5", "ul"].includes(dom[i].localName)
      ) {
        translateTree.push(dom[i])
        translateArr.push(dom[i]["innerHTML"])
      } else {
        translateTree.push({
          dom: dom[i],
          not_translate: true
        })
        translateArr.push("")
      }
    }

    axios
      .post("/translate", {
        arr: translateArr,
        lang: nextLang,
        tld: that.state.bowserLang === "zh-CN" ? "cn" : "com"
      })
      .then(res => {
        const data = res.data[0]
        translateRes = parseMultiple(data)
        for (let i = 0; i < translateArr.length; i++) {
          if (translateArr[i]) {
            translateTree[i].innerHTML = translateRes[i]
          }
        }

        let translator = document.getElementById("translator")
        translator.innerHTML = ""
        try {
          translateTree.forEach(item => {
            if (item && !item.not_translate) {
              translator.insertAdjacentElement("beforeend", item)
            } else {
              translator.appendChild(item.dom)
            }
          })
        } catch (err) {
        } finally {
          that.setState({
            lang: nextLang
          })

          that.highlightCode()
        }
      })
  }
}
export default ArticleContent
