import React from "react"
import Head from "next/head"
import Nav from "../components/NavBar"
import ArticleList from "../components/article/ArticleList"
import PageDivider from "../components/article/PageDivider"
import Bottom from "../components/Bottom"
import { observer, inject } from "mobx-react"
import { parseUrl } from "../public/static/js/tools"

@inject("mainStore")
@observer
class IndexPage extends React.Component {
  state = {
    currentPage: 0
  }

  constructor(props) {
    super(props)
  }

  render() {
    const $route = parseUrl("https://maotang.mew" + this.props.router.asPath)
    const urlPage =
      ($route.query && $route.query.page !== undefined && $route.query.page) ||
      ($route.path &&
        $route.path.includes("page/") &&
        $route.path.replace("page/", "")) ||
      1

    return (
      <div className="App main-page">
        <Nav />
        <ArticleList propsPage={this.state.currentPage || urlPage} />
        <PageDivider />
        <Bottom />
      </div>
    )
  }

  componentWillUpdate() {
    if (this.props.mainStore.articlePage !== this.state.currentPage) {
      this.setState({
        currentPage: this.props.mainStore.articlePage
      })
    }
  }
}

export default IndexPage
