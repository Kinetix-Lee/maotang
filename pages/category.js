import React from "react"
import NavBar from "../components/NavBar"
import AlertBar from "../components/AlertBar"
import ArticleList from "../components/article/ArticleList"
import Bottom from "../components/Bottom"
import Head from "next/head"
import { site as SITE } from "../public/static/config/maotang.json"
import { observer, inject } from "mobx-react"
import ErrorPage from "./_error"

@inject("mainStore")
@observer
class Category extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    this.props.mainStore.getStaticInfo()
    let list, date, category
    if (this.props.router.asPath.includes("archive")) {
      date = this.props.router.asPath
        .toLowerCase()
        .replace("/archive/", "")
        .replace("-", "/")
      list = this.props.mainStore.getArticlesByArchive(date).slice()
    } else if (this.props.router.asPath.includes("category")) {
      category = decodeURIComponent(
        this.props.router.asPath.toLowerCase().replace("/category/", "")
      )
      list = this.props.mainStore.getArticlesByCategory(category).slice()
    }
    if (list && list.length) {
      return (
        <div className="App main-page">
          <Head>
            <title>{`${date || category} - ${SITE.title}`}</title>
          </Head>
          <NavBar />
          <AlertBar
            info={date ? date.replace("/", " 年 ") + " 月" : category}
          />
          <ArticleList archive={list} />
          <div className="page-divider" />
          <Bottom show={true} />
        </div>
      )
    } else {
      return <ErrorPage errcode="404" />
    }
  }
}

export default Category
