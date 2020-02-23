import React from "react"
import NavBar from "../components/NavBar"
import AlertBar from "../components/AlertBar"
import ArticleList from "../components/article/ArticleList"
import Bottom from "../components/Bottom"
import Head from "next/head"
import { site as SITE } from "../public/static/config/mao.tang.json"
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
    const date = this.props.router.asPath
      .toLowerCase()
      .replace("/archive/", "")
      .replace("-", "/")
    const list = this.props.mainStore.getArticlesByArchive(date).slice()
    if (list && list.length) {
      return (
        <div className="App main-page">
          <Head>
            <title>{`${date} - ${SITE.title}`}</title>
          </Head>
          <NavBar />
          <AlertBar info={date.replace("/", " 年 ") + " 月"} />
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
