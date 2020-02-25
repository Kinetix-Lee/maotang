import React from "react"
import Head from "next/head"
import Nav from "../components/NavBar"
import ArticleList from "../components/article/ArticleList"
import { site as SITE } from "../public/static/config/maotang.json"
import SearchBox from "../components/SearchBox"
import Bottom from "../components/Bottom"
import { observer, inject } from "mobx-react"
import { parseUrl } from "../public/static/js/tools"

@inject("mainStore")
@observer
class SearchPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="App main-page">
        <Head>
          <title>{`搜索 - ${SITE.title}`}</title>
        </Head>
        <Nav />
        <SearchBox router={this.props.router} />
        <div className="page-divider" />
        <Bottom show={true} />
      </div>
    )
  }
}

export default SearchPage
