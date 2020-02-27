import React from "react"
import { observer, inject } from "mobx-react"
import { getRandomKey, formatDate } from "../../public/static/js/tools"
import Link from "next/link"

let currentList = []

@inject("mainStore")
@observer
class ArticleList extends React.Component {
  state = {
    articleList: [],
    currentPage: 1,
    isChange: false
  }

  constructor(props) {
    super(props)
  }

  render() {
    const isLarge = this.props.large
    if (!this.props.archive) {
      if (
        currentList &&
        currentList.length > 0 &&
        this.props.mainStore.loadCount == 1
      ) {
        return (
          <div className="wrapper">
            <div
              className={(isLarge ? "block-large" : "block") + " article-list"}
            >
              {currentList.map(item => (
                <div
                  key={getRandomKey()}
                  className="article-item wow fadeIn animated"
                >
                  <Link href={"/blog/" + item.id}>
                    <a>{item.title}</a>
                  </Link>
                  <div className="brief">
                    {new Date(item.time.replace(/-/g, "/"))
                      .toLocaleDateString()
                      .replace(/-/g, "/")
                      .split("/")
                      .map(item => (item.length == 1 ? "0" + item : item))
                      .join("/")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      } else {
        return (
          <div className="wrapper">
            <div
              className={(isLarge ? "block-large" : "block") + " article-list"}
            >
              {this.props.mainStore.articleList.map(item => (
                <div key={getRandomKey()} className="article-item show">
                  <Link href={"/blog/" + item.id}>
                    <a>{item.title}</a>
                  </Link>
                  <div className="brief">
                    {new Date(item.time.replace(/-/g, "/"))
                      .toLocaleDateString()
                      .replace(/-/g, "/")
                      .split("/")
                      .map(item => (item.length == 1 ? "0" + item : item))
                      .join("/")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    } else {
      const archiveList = this.props.archive
      return (
        <div className="wrapper">
          <div
            className={(isLarge ? "block-large" : "block") + " article-list"}
          >
            {archiveList.map(item => (
              <div
                key={getRandomKey()}
                className="article-item wow fadeIn animated"
              >
                <Link href={"/blog/" + item.id}>
                  <a>{item.title}</a>
                </Link>
                <div className="brief">
                  {new Date(item.time.replace(/-/g, "/"))
                    .toLocaleDateString()
                    .replace(/-/g, "/")
                    .split("/")
                    .map(item => (item.length == 1 ? "0" + item : item))
                    .join("/")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  componentWillMount() {
    if (this.props.archive) return
    this.setState({
      currentPage: this.props.mainStore.articlePage
    })
    currentList = this.props.mainStore.getArticleList(this.props.propsPage)
  }

  componentDidMount() {
    if (this.props.archive) return
    this.setState({
      isChange: false,
      currentPage: this.props.propsPage
    })
  }

  componentWillUpdate() {
    if (this.props.archive) return
    if (this.props.propsPage - this.state.currentPage !== 0) {
      this.setState({
        isChange: true,
        currentPage: this.props.propsPage,
        articleList: this.props.mainStore.articleList
      })
    }
  }
}

export default ArticleList
