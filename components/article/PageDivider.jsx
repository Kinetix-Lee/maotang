import React from "react"
import { Pagination } from "antd"
import { observer, inject } from "mobx-react"
import { parseUrl } from "../../public/static/js/tools"
import Router from "next/router"

@inject("mainStore")
@observer
class PageDivider extends React.Component {
  state = {
    current: 1,
    pageSize: 10,
    isXsWindow: 1
  }

  constructor(props) {
    super(props)
  }

  onChange = e => {
    if (e) {
      let href = window.location.href
      this.setState({
        current: e
      })

      this.props.mainStore.getArticleList(e * 1)

      history.pushState(
        {},
        "",
        href.includes("page/") ? e : "/page/" + e
      ) /* 用 history 实现路由软刷新 */
    }
  }

  getUrlPage = page => {
    this.setState({
      current: page
    })
    this.props.mainStore.getArticleList(page)
  }

  render() {
    return (
      <div className="wrapper">
        <div
          className={
            "block page-divider " +
            (this.state.isXsWindow ? " small-divider" : "")
          }
        >
          <Pagination
            size={this.state.isXsWindow ? "small" : ""}
            current={this.state.current}
            defaultCurrent={1}
            defaultPageSize={10}
            total={
              this.props.mainStore.articles
                ? this.props.mainStore.articles.length
                : 1
            }
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const $route = parseUrl(window.location.href)
    const page =
      ($route.query && $route.query.page !== undefined && $route.query.page) ||
      ($route.path &&
        $route.path.includes("page/") &&
        $route.path.replace("page/", "")) ||
      1

    this.props.mainStore.getArticleList(page)

    this.setState({
      current: page * 1
    })
  }
}

export default PageDivider
